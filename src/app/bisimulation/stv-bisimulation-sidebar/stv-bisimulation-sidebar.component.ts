import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import { StvFileInputComponent } from "src/app/common/stv-file-input/stv-file-input.component";
import { StvSelectComponent } from "src/app/common/stv-select/stv-select.component";
import { ComputeService } from "src/app/compute.service";
import { ConfigProvider } from "src/app/config.provider";
import { ApproximationModals } from "src/app/modals/ApproximationModals";
import { BisimulationCheckingModals } from "src/app/modals/BisimulationCheckingModals";
import { DominoDfsModals } from "src/app/modals/DominoDfsModals";
import * as state from "src/app/state";
import { InputFileReader } from "src/app/utils";
import * as Types from "stv-types";

@Component({
    selector: "stv-bisimulation-sidebar",
    templateUrl: "./stv-bisimulation-sidebar.component.html",
    styleUrls: ["./stv-bisimulation-sidebar.component.less"],
})
export class StvBisimulationSidebarComponent implements OnInit, OnDestroy {
    
    @ViewChild("leftDominoDfsHeuristicSelector")
    leftDominoDfsHeuristicSelectorRef?: StvSelectComponent;
    
    @ViewChild("rightDominoDfsHeuristicSelector")
    rightDominoDfsHeuristicSelectorRef?: StvSelectComponent;
    
    @ViewChild("model1FileInput")
    model1FileInputRef?: ElementRef<StvFileInputComponent>;
    
    get model1FileInput(): StvFileInputComponent {
        return this.model1FileInputRef! as unknown as StvFileInputComponent;
    }
    
    @ViewChild("model2FileInput")
    model2FileInputRef?: ElementRef<StvFileInputComponent>;
    
    get model2FileInput(): StvFileInputComponent {
        return this.model2FileInputRef! as unknown as StvFileInputComponent;
    }
    
    @ViewChild("bisimulationSpecificationFileInput")
    bisimulationSpecificationFileInputRef?: ElementRef<StvFileInputComponent>;
    
    get bisimulationSpecificationFileInput(): StvFileInputComponent {
        return this.bisimulationSpecificationFileInputRef! as unknown as StvFileInputComponent;
    }
    
    _canGenerate: boolean = false;
    get canGenerate(): boolean { return this._canGenerate; }
    set canGenerate(canGenerate: boolean) { this._canGenerate = canGenerate; }
    
    _canCheck: boolean = false;
    get canCheck(): boolean { return this._canCheck; }
    set canCheck(canCheck: boolean) { this._canCheck = canCheck; }
    
    _canVerifyLeft: boolean = false;
    get canVerifyLeft(): boolean { return this._canVerifyLeft; }
    set canVerifyLeft(canVerifyLeft: boolean) { this._canVerifyLeft = canVerifyLeft; }
    
    _canVerifyRight: boolean = false;
    get canVerifyRight(): boolean { return this._canVerifyRight; }
    set canVerifyRight(canVerifyRight: boolean) { this._canVerifyRight = canVerifyRight; }
    
    coalitionA: string | null = null;
    leftFormula: string | null = null;
    rightFormula: string | null = null;
    leftDominoDfsHeuristic: Types.actions.DominoDfsHeuristic = "basic";
    rightDominoDfsHeuristic: Types.actions.DominoDfsHeuristic = "basic";
    
    appStateSubscription: Subscription;
    
    // Config
    maxModel1FileSizeBytes: number | "";
    maxModel2FileSizeBytes: number | "";
    maxBisimulationSpecificationFileSizeBytes: number | "";
    
    constructor(private appState: state.AppState, private computeService: ComputeService, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.maxModel1FileSizeBytes = config.fileModel.maxFileSizeBytes === ConfigProvider.UNLIMITED ? "" : config.fileModel.maxFileSizeBytes;
        this.maxModel2FileSizeBytes = config.fileModel.maxFileSizeBytes === ConfigProvider.UNLIMITED ? "" : config.fileModel.maxFileSizeBytes;
        this.maxBisimulationSpecificationFileSizeBytes = config.mappingFile.maxFileSizeBytes === ConfigProvider.UNLIMITED ? "" : config.mappingFile.maxFileSizeBytes;
        
        this.appState.action = new state.actions.Bisimulation();
        this.appStateSubscription = appState.state$
            .pipe(debounce(() => interval(10)))
            .subscribe(() => this.onAppStateChanged());
    }

    ngOnInit(): void {}
    
    ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
    }
    
    onAppStateChanged(): void {
        this.canGenerate = this.getBisimulationState().canGenerateModel();
        this.canCheck = this.getBisimulationState().canCheckBisimulation();
        this.canVerifyLeft = this.getBisimulationState().canVerifyModel1();
        this.canVerifyRight = this.getBisimulationState().canVerifyModel2();
        this.leftFormula = this.getBisimulationModel1().formula;
        this.rightFormula = this.getBisimulationModel2().formula;
        this.coalitionA = null;
    }
    
    async onModel1FileListChanged(fileList: FileList): Promise<void> {
        const modelString = await InputFileReader.readWithFileSizeVerification(fileList, this.maxModel1FileSizeBytes, this.model1FileInput);
        this.getBisimulationModel1Parameters().modelString = modelString;
    }
    
    async onModel2FileListChanged(fileList: FileList): Promise<void> {
        const modelString = await InputFileReader.readWithFileSizeVerification(fileList, this.maxModel2FileSizeBytes, this.model2FileInput);
        this.getBisimulationModel2Parameters().modelString = modelString;
    }
    
    async onBisimulationSpecificationFileListChanged(fileList: FileList): Promise<void> {
        const modelString = await InputFileReader.readWithFileSizeVerification(fileList, this.maxBisimulationSpecificationFileSizeBytes, this.bisimulationSpecificationFileInput);
        this.getBisimulationSpecificationParameters().modelString = modelString;
    }
    
    async onGenerateClick(): Promise<void> {
        await this.generateModel(this.getBisimulationModel1(), false);
        await this.generateModel(this.getBisimulationModel2(), false);
    }
    
    async onCheckClick(): Promise<void> {
        await this.checkBisimulation();
    }
    
    async checkBisimulation(): Promise<void> {
        const result = await this.computeService.checkBisimulation(this.getBisimulationModel1(), this.getBisimulationModel2(), this.getBisimulationSpecificationParameters());
        this.coalitionA = result.coalition[0];
        BisimulationCheckingModals.showForResult(result);
    }
    
    async generateModel(model: state.models.File, reduced: boolean): Promise<void> {
        await this.computeService.generateModel(model, reduced);
    }
    
    async onLeftLowerApproximationClick(): Promise<void> {
        await this.verifyModelUsingLowerApproximation(this.getBisimulationModel1(), false);
    }
    
    async onRightLowerApproximationClick(): Promise<void> {
        await this.verifyModelUsingLowerApproximation(this.getBisimulationModel2(), false);
    }
    
    async verifyModelUsingLowerApproximation(model: state.models.File, reduced: boolean): Promise<void> {
        const result = await this.computeService.verifyModelUsingLowerApproximation(model, reduced);
        ApproximationModals.showForResult(result);
    }
    
    async onLeftUpperApproximationClick(): Promise<void> {
        await this.verifyModelUsingUpperApproximation(this.getBisimulationModel1(), false);
    }
    
    async onRightUpperApproximationClick(): Promise<void> {
        await this.verifyModelUsingUpperApproximation(this.getBisimulationModel2(), false);
    }
    
    async verifyModelUsingUpperApproximation(model: state.models.File, reduced: boolean): Promise<void> {
        const result = await this.computeService.verifyModelUsingUpperApproximation(model, reduced);
        ApproximationModals.showForResult(result);
    }
    
    async onLeftDominoDfsClick(): Promise<void> {
        await this.verifyModelUsingDominoDfs(this.getBisimulationModel1(), false, this.leftDominoDfsHeuristic);
    }
    
    async onRightDominoDfsClick(): Promise<void> {
        await this.verifyModelUsingDominoDfs(this.getBisimulationModel2(), false, this.rightDominoDfsHeuristic);
    }
    
    async verifyModelUsingDominoDfs(model: state.models.File, reduced: boolean, heuristic: Types.actions.DominoDfsHeuristic): Promise<void> {
        const result = await this.computeService.verifyModelUsingDominoDfs(model, reduced, heuristic);
        DominoDfsModals.showForResult(result);
    }
    
    onLeftDominoDfsHeuristicChanged(heuristic: string): void {
        this.leftDominoDfsHeuristic = heuristic as Types.actions.DominoDfsHeuristic;
    }
    
    onRightDominoDfsHeuristicChanged(heuristic: string): void {
        this.rightDominoDfsHeuristic = heuristic as Types.actions.DominoDfsHeuristic;
    }
    
    private getBisimulationState(): state.actions.Bisimulation {
        return this.appState.action as state.actions.Bisimulation;
    }
    
    private getBisimulationModel1(): state.models.File {
        return this.getBisimulationState().model1 as state.models.File;
    }
    
    private getBisimulationModel2(): state.models.File {
        return this.getBisimulationState().model2 as state.models.File;
    }
    
    private getBisimulationModel1Parameters(): state.models.parameters.File {
        return this.getBisimulationModel1().parameters;
    }
    
    private getBisimulationModel2Parameters(): state.models.parameters.File {
        return this.getBisimulationModel2().parameters;
    }
    
    private getBisimulationSpecificationParameters(): state.models.parameters.File {
        return this.getBisimulationState().specification as state.models.parameters.File;
    }
    
}
