import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as Types from "stv-types";
import * as state from "../../state";
import { ComputeService } from "src/app/compute.service";
import { StvSelectComponent } from "src/app/common/stv-select/stv-select.component";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import { InputFileReader } from "src/app/utils";
import { ApproximationModals } from "src/app/modals/ApproximationModals";
import { DominoDfsModals } from "src/app/modals/DominoDfsModals";
import { ErrorModals } from "src/app/modals/ErrorModals";
import { StvFileInputComponent } from "src/app/common/stv-file-input/stv-file-input.component";
import { ConfigProvider } from "src/app/config.provider";

@Component({
    selector: "stv-reduction-sidebar",
    templateUrl: "./stv-reduction-sidebar.component.html",
    styleUrls: ["./stv-reduction-sidebar.component.less"],
})
export class StvReductionSidebarComponent implements OnInit, OnDestroy {
    
    _canGenerateGlobal: boolean = false;
    get canGenerateGlobal(): boolean { return this._canGenerateGlobal; }
    set canGenerateGlobal(canGenerateGlobal: boolean) { this._canGenerateGlobal = canGenerateGlobal; }
    
    _canGenerateReduced: boolean = false;
    get canGenerateReduced(): boolean { return this._canGenerateReduced; }
    set canGenerateReduced(canGenerateReduced: boolean) { this._canGenerateReduced = canGenerateReduced; }
    
    _canVerifyGlobal: boolean = false;
    get canVerifyGlobal(): boolean { return this._canVerifyGlobal; }
    set canVerifyGlobal(canVerifyGlobal: boolean) { this._canVerifyGlobal = canVerifyGlobal; }
    
    _canVerifyReduced: boolean = false;
    get canVerifyReduced(): boolean { return this._canVerifyReduced; }
    set canVerifyReduced(canVerifyReduced: boolean) { this._canVerifyReduced = canVerifyReduced; }
    
    @ViewChild("dominoDfsHeuristicGlobalSelector")
    dominoDfsHeuristicGlobalSelectorRef?: StvSelectComponent;
    
    @ViewChild("dominoDfsHeuristicReducedSelector")
    dominoDfsHeuristicReducedSelectorRef?: StvSelectComponent;
    
    @ViewChild("modelFileInput")
    modelFileInputRef?: ElementRef<StvFileInputComponent>;
    
    get modelFileInput(): StvFileInputComponent {
        return this.modelFileInputRef! as unknown as StvFileInputComponent;
    }
    
    formula: string | null = null;
    modelType: string = "";
    dominoDfsHeuristicGlobal: Types.actions.DominoDfsHeuristic = "basic";
    dominoDfsHeuristicReduced: Types.actions.DominoDfsHeuristic = "basic";
    
    routerSubscription: Subscription;
    appStateSubscription: Subscription;
    
    // Config
    maxModelFileSizeBytes: number | "";
    
    constructor(private router: Router, public appState: state.AppState, private computeService: ComputeService, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.maxModelFileSizeBytes = config.fileModel.maxFileSizeBytes === ConfigProvider.UNLIMITED ? "" : config.fileModel.maxFileSizeBytes;
        
        this.appState.action = new state.actions.Reduction();
        this.dominoDfsHeuristicGlobal = this.appState.action.dominoDfsHeuristicGlobal;
        this.dominoDfsHeuristicReduced = this.appState.action.dominoDfsHeuristicReduced;
        
        this.routerSubscription = router.events.subscribe(value => {
            if (value instanceof NavigationEnd) {
                const path = router.getCurrentNavigation()?.finalUrl?.root.children.primary?.segments[1]?.path;
                if (path) {
                    this.modelType = path;
                }
            }
        });
        this.appStateSubscription = appState.state$
            .pipe(debounce(() => interval(10)))
            .subscribe(() => this.onAppStateChanged());
    }

    ngOnInit(): void {}
    
    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
        this.appStateSubscription.unsubscribe();
    }
    
    onModelTypeChanged(value: string): void {
        this.router.navigate(["/reduction",  value]);
    }
    
    async onGenerateGlobalClick(): Promise<void> {
        await this.generateModel(false);
    }
    
    async onGenerateReducedClick(): Promise<void> {
        await this.generateModel(true);
    }
    
    async generateModel(reduced: boolean): Promise<void> {
        await this.computeService.generateModel(this.getReductionModel(), reduced);
    }
    
    async onLowerApproximationGlobalClick(): Promise<void> {
        await this.verifyModelUsingLowerApproximation(false);
    }
    
    async onLowerApproximationReducedClick(): Promise<void> {
        await this.verifyModelUsingLowerApproximation(true);
    }
    
    async verifyModelUsingLowerApproximation(reduced: boolean): Promise<void> {
        const result = await this.computeService.verifyModelUsingLowerApproximation(this.getReductionModel(), reduced);
        ApproximationModals.showForResult(result);
        if(result.type == "approximationHolds" || result.type=="approximationMightHold") {
            this.appState.currentGraphService?.showStrategy(result.strategyObjectiveModel);
        } else {
            this.appState.currentGraphService?.clearStrategy();
        }
    }
    
    async onUpperApproximationGlobalClick(): Promise<void> {
        await this.verifyModelUsingUpperApproximation(false);
    }
    
    async onUpperApproximationReducedClick(): Promise<void> {
        await this.verifyModelUsingUpperApproximation(true);
    }
    
    async verifyModelUsingUpperApproximation(reduced: boolean): Promise<void> {
        const result = await this.computeService.verifyModelUsingUpperApproximation(this.getReductionModel(), reduced);
        ApproximationModals.showForResult(result);
        if(result.type == "approximationHolds" || result.type=="approximationMightHold") {
            this.appState.currentGraphService?.showStrategy(result.strategyObjectiveModel);
        } else {
            this.appState.currentGraphService?.clearStrategy();
        }
    }
    
    async onDominoDfsGlobalClick(): Promise<void> {
        await this.verifyModelUsingDominoDfs(false);
    }
    
    async onDominoDfsReducedClick(): Promise<void> {
        await this.verifyModelUsingDominoDfs(true);
    }
    
    async verifyModelUsingDominoDfs(reduced: boolean): Promise<void> {
        const heuristic: Types.actions.DominoDfsHeuristic = reduced ? this.dominoDfsHeuristicReduced : this.dominoDfsHeuristicGlobal;
        const result = await this.computeService.verifyModelUsingDominoDfs(this.getReductionModel(), reduced, heuristic);
        DominoDfsModals.showForResult(result);
        this.appState.currentGraphService?.showStrategy(result.strategyObjectiveModel);
    }
    
    onDominoDfsHeuristicGlobalChanged(heuristic: string): void {
        const reductionState = this.getReductionState();
        reductionState.dominoDfsHeuristicGlobal = heuristic as Types.actions.DominoDfsHeuristic;
        this.dominoDfsHeuristicGlobal = reductionState.dominoDfsHeuristicGlobal;
    }
    
    onDominoDfsHeuristicReducedChanged(heuristic: string): void {
        const reductionState = this.getReductionState();
        reductionState.dominoDfsHeuristicReduced = heuristic as Types.actions.DominoDfsHeuristic;
        this.dominoDfsHeuristicReduced = reductionState.dominoDfsHeuristicReduced;
    }
    
    onAppStateChanged(): void {
        this.canGenerateGlobal = this.getReductionState().canGenerateGlobalModel();
        this.canGenerateReduced = this.getReductionState().canGenerateReducedModel();
        this.canVerifyGlobal = this.getReductionState().canVerifyGlobalModel();
        this.canVerifyReduced = this.getReductionState().canVerifyReducedModel();
        this.formula = this.getReductionModel().formula;
    }
    
    async onFileListChanged(fileList: FileList): Promise<void> {
        const modelString = await InputFileReader.readWithFileSizeVerification(fileList, this.maxModelFileSizeBytes, this.modelFileInput);
        this.getReductionModelParameters().modelString = modelString;
    }
    
    private getReductionState(): state.actions.Reduction {
        return this.appState.action as state.actions.Reduction;
    }
    
    private getReductionModel(): state.models.File {
        return this.getReductionState().model as state.models.File;
    }
    
    private getReductionModelParameters(): state.models.parameters.File {
        return this.getReductionModel().parameters;
    }
    
}
