import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as Types from "stv-types";
import * as state from "../../state";
import { ComputeService } from "src/app/compute.service";
import { StvSelectComponent } from "src/app/common/stv-select/stv-select.component";
import { Subscription } from "rxjs";

@Component({
    selector: "stv-verification-sidebar",
    templateUrl: "./stv-verification-sidebar.component.html",
    styleUrls: ["./stv-verification-sidebar.component.less"],
})
export class StvVerificationParametersComponent implements OnInit, OnDestroy {
    
    _canGenerate: boolean = false;
    get canGenerate(): boolean { return this._canGenerate; }
    set canGenerate(canGenerate: boolean) { this._canGenerate = canGenerate; }
    
    _canVerify: boolean = false;
    get canVerify(): boolean { return this._canVerify; }
    set canVerify(canVerify: boolean) { this._canVerify = canVerify; }
    
    @ViewChild("dominoDfsHeuristicSelector")
    dominoDfsHeuristicSelectorRef?: StvSelectComponent;
    
    formula: string | null = null;
    modelType: string = "";
    dominoDfsHeuristic: Types.actions.DominoDfsHeuristic = "basic";
    
    routerSubscription: Subscription;
    appStateSubscription: Subscription;
    
    constructor(private router: Router, public appState: state.AppState, private computeService: ComputeService) {
        this.appState.action = new state.actions.Verification();
        this.dominoDfsHeuristic = this.appState.action.dominoDfsHeuristic;
        
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
        this.router.navigate(["/verification",  value]);
    }
    
    async onGenerateClick(): Promise<void> {
        await this.generateModel(false);
    }
    
    async generateModel(reduced: boolean): Promise<void> {
        await this.computeService.generateModel(this.getVerificationModel(), reduced);
    }
    
    onLowerApproximationClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onUpperApproximationClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onDominoDfsClick(): void {
        // @todo WP
        console.log(this.appState);
    }
    
    onDominoDfsHeuristicChanged(heuristic: string): void {
        const verificationState = this.getVerificationState();
        verificationState.dominoDfsHeuristic = heuristic as Types.actions.DominoDfsHeuristic;
        this.dominoDfsHeuristic = verificationState.dominoDfsHeuristic;
    }
    
    onAppStateChanged(): void {
        this.canGenerate = this.getVerificationState().canGenerateModel();
        this.canVerify = this.getVerificationState().canVerifyModel();
        this.formula = this.getVerificationState().model.formula;
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.SomeModel {
        return this.getVerificationState().model as state.models.SomeModel;
    }
    
}
