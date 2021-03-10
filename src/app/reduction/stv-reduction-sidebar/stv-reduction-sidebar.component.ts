import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as Types from "stv-types";
import * as state from "../../state";
import { ComputeService } from "src/app/compute.service";
import { StvSelectComponent } from "src/app/common/stv-select/stv-select.component";
import { Subscription } from "rxjs";
import { InputFileReader } from "src/app/utils";

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
    
    formula: string | null = null;
    modelType: string = "";
    dominoDfsHeuristicGlobal: Types.actions.DominoDfsHeuristic = "basic";
    dominoDfsHeuristicReduced: Types.actions.DominoDfsHeuristic = "basic";
    
    routerSubscription: Subscription;
    appStateSubscription: Subscription;
    
    constructor(private router: Router, public appState: state.AppState, private computeService: ComputeService) {
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
        this.appStateSubscription = appState.state$.subscribe(() => {
            this.onAppStateChanged();
        });
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
    
    onLowerApproximationGlobalClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onLowerApproximationReducedClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onUpperApproximationGlobalClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onUpperApproximationReducedClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onDominoDfsGlobalClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onDominoDfsReducedClick(): void {
        // @todo WP
        console.log(this.appState);
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
        console.log("RED")
        this.canGenerateGlobal = this.getReductionState().canGenerateGlobalModel();
        this.canGenerateReduced = this.getReductionState().canGenerateReducedModel();
        this.canVerifyGlobal = this.getReductionState().canVerifyGlobalModel();
        this.canVerifyReduced = this.getReductionState().canVerifyReducedModel();
        this.formula = this.getReductionModel().formula;
    }
    
    async onFileListChanged(fileList: FileList): Promise<void> {
        let modelString = "";
        if (fileList.length > 0) {
            modelString = await InputFileReader.read(fileList[0]);
        }
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
