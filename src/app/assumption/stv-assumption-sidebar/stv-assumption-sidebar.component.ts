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
    selector: "stv-assumption-sidebar",
    templateUrl: "./stv-assumption-sidebar.component.html",
    styleUrls: ["./stv-assumption-sidebar.component.less"],
})
export class StvAssumptionSidebarComponent implements OnInit, OnDestroy {
    
    _canGenerate: boolean = false;
    get canGenerate(): boolean { return this._canGenerate; }
    set canGenerate(canGenerate: boolean) { this._canGenerate = canGenerate; }
    
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
        
        this.appState.action = new state.actions.Assumption();
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
        this.router.navigate(["/assumption",  value]);
    }
    
    async onGenerateClick(): Promise<void> {
        await this.generateModel();
    }
    
    async generateModel(): Promise<void> {
        await this.computeService.generateAssumption(this.getAssumptionModel());
    }
    
    // async onLowerApproximationGlobalClick(): Promise<void> {
    //     await this.verifyModelUsingLowerApproximation(false);
    // }
    
    // async onLowerApproximationReducedClick(): Promise<void> {
    //     await this.verifyModelUsingLowerApproximation(true);
    // }
    
    // async verifyModelUsingLowerApproximation(reduced: boolean): Promise<void> {
    //     const result = await this.computeService.verifyModelUsingLowerApproximation(this.getReductionModel(), reduced);
    //     ApproximationModals.showForResult(result);
    // }
    
    // async onUpperApproximationGlobalClick(): Promise<void> {
    //     await this.verifyModelUsingUpperApproximation(false);
    // }
    
    // async onUpperApproximationReducedClick(): Promise<void> {
    //     await this.verifyModelUsingUpperApproximation(true);
    // }
    
    // async verifyModelUsingUpperApproximation(reduced: boolean): Promise<void> {
    //     const result = await this.computeService.verifyModelUsingUpperApproximation(this.getReductionModel(), reduced);
    //     ApproximationModals.showForResult(result);
    // }
    
    // async onDominoDfsGlobalClick(): Promise<void> {
    //     await this.verifyModelUsingDominoDfs(false);
    // }
    
    // async onDominoDfsReducedClick(): Promise<void> {
    //     await this.verifyModelUsingDominoDfs(true);
    // }
    
    // async verifyModelUsingDominoDfs(reduced: boolean): Promise<void> {
    //     const heuristic: Types.actions.DominoDfsHeuristic = reduced ? this.dominoDfsHeuristicReduced : this.dominoDfsHeuristicGlobal;
    //     const result = await this.computeService.verifyModelUsingDominoDfs(this.getReductionModel(), reduced, heuristic);
    //     DominoDfsModals.showForResult(result);
    // }
    
    onDominoDfsHeuristicGlobalChanged(heuristic: string): void {
        const reductionState = this.getAssumptionState();
        reductionState.dominoDfsHeuristicGlobal = heuristic as Types.actions.DominoDfsHeuristic;
        this.dominoDfsHeuristicGlobal = reductionState.dominoDfsHeuristicGlobal;
    }
    
    onDominoDfsHeuristicReducedChanged(heuristic: string): void {
        const reductionState = this.getAssumptionState();
        reductionState.dominoDfsHeuristicReduced = heuristic as Types.actions.DominoDfsHeuristic;
        this.dominoDfsHeuristicReduced = reductionState.dominoDfsHeuristicReduced;
    }
    
    onAppStateChanged(): void {
        this.canGenerate = this.getAssumptionState().canGenerateModel();
        this.canVerifyGlobal = this.getAssumptionState().canVerifyGlobalModel();
        this.canVerifyReduced = this.getAssumptionState().canVerifyReducedModel();
        // this.formula = this.getReductionModel().formula;
    }
    
    async onFileListChanged(fileList: FileList): Promise<void> {
        const modelString = await InputFileReader.readWithFileSizeVerification(fileList, this.maxModelFileSizeBytes, this.modelFileInput);
        this.getAssumptionModelParameters().modelString = modelString;
    }
    
    private getAssumptionState(): state.actions.Assumption {
        return this.appState.action as state.actions.Assumption;
    }
    
    private getAssumptionModel(): state.models.File {
        return this.getAssumptionState().model as state.models.File;
    }
    
    private getAssumptionModelParameters(): state.models.parameters.File {
        return this.getAssumptionModel().parameters;
    }
    
}
