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
    
    _canVerify: boolean = false;
    get canVerify(): boolean { return this._canVerify; }
    set canVerify(canVerify: boolean) { this._canVerify = canVerify; }
    
    @ViewChild("dominoDfsHeuristicSelector")
    dominoDfsHeuristicSelectorRef?: StvSelectComponent;
    
    @ViewChild("modelFileInput")
    modelFileInputRef?: ElementRef<StvFileInputComponent>;
    
    get modelFileInput(): StvFileInputComponent {
        return this.modelFileInputRef! as unknown as StvFileInputComponent;
    }
    
    formula: string | null = null;
    modelType: string = "";
    dominoDfsHeuristic: Types.actions.DominoDfsHeuristic = "basic";
    statesCount: number | null = null;
    transitionsCount: number | null = null;
    
    routerSubscription: Subscription;
    appStateSubscription: Subscription;
    
    // Config
    maxModelFileSizeBytes: number | "";
    
    constructor(private router: Router, public appState: state.AppState, private computeService: ComputeService, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.maxModelFileSizeBytes = config.fileModel.maxFileSizeBytes === ConfigProvider.UNLIMITED ? "" : config.fileModel.maxFileSizeBytes;
        
        this.appState.action = new state.actions.Assumption();
        this.dominoDfsHeuristic = this.appState.action.dominoDfsHeuristic;
        
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
    
    async onLowerApproximationClick(): Promise<void> {
        const result = await this.computeService.verifyAssumptionUsingLowerApproximation(this.getAssumptionModel(), this.getAssumptionState().modelId);
        ApproximationModals.showForResult(result);
        if(result.type == "approximationHolds" || result.type=="approximationMightHold") {
            this.appState.currentGraphService?.showStrategy(result.strategyObjectiveModel);
        } else {
            this.appState.currentGraphService?.clearStrategy();
        }
    }
    
    async onUpperApproximationClick(): Promise<void> {
        const result = await this.computeService.verifyAssumptionUsingUpperApproximation(this.getAssumptionModel(), this.getAssumptionState().modelId);
        ApproximationModals.showForResult(result);
        if(result.type == "approximationHolds" || result.type=="approximationMightHold") {
            this.appState.currentGraphService?.showStrategy(result.strategyObjectiveModel);
        } else {
            this.appState.currentGraphService?.clearStrategy();
        }
    }
    
    async onDominoDfsClick(): Promise<void> {
        const heuristic: Types.actions.DominoDfsHeuristic = this.dominoDfsHeuristic;
        const result = await this.computeService.verifyAssumptionUsingDominoDfs(this.getAssumptionModel(), this.getAssumptionState().modelId, heuristic);
        DominoDfsModals.showForResult(result);
        this.appState.currentGraphService?.showStrategy(result.strategyObjectiveModel);
    }
    
    onDominoDfsHeuristicChanged(heuristic: string): void {
        const reductionState = this.getAssumptionState();
        reductionState.dominoDfsHeuristic = heuristic as Types.actions.DominoDfsHeuristic;
        this.dominoDfsHeuristic = reductionState.dominoDfsHeuristic;
    }
    
    onAppStateChanged(): void {
        this.canGenerate = this.getAssumptionState().canGenerateModel();
        this.canVerify = this.getAssumptionState().canVerifyModel();

        let modelNames = this.getAssumptionModel().localModelNames || [];
        let formulas = this.getAssumptionModel().formulas || [];
        let localModels = this.getAssumptionModel().localModels || [];
        let ok = false;
        
        for(let i = 0; i < modelNames.length; i++) {
            if(this.getAssumptionState().modelId == modelNames[i]) {
                this.formula = formulas[i];
                this.statesCount = localModels[i].nodes.length;
                this.transitionsCount = localModels[i].links.length;
                ok = true;
                break;
            }
        }

        if(!ok) {
            this.formula = formulas[formulas.length - 1];
            this.statesCount = this.getAssumptionModel().globalModel?.nodes.length || null;
            this.transitionsCount = this.getAssumptionModel().globalModel?.links.length || null;
        }
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
