import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import * as state from "src/app/state";
import { StvModelTabsComponent } from "src/app/common/stv-model-tabs/stv-model-tabs.component";

@Component({
    selector: "stv-reduction-main",
    templateUrl: "./stv-assumption-main.component.html",
    styleUrls: ["./stv-assumption-main.component.less"],
})
export class StvAssumptionMainComponent implements OnInit, OnDestroy, AfterViewInit {
    
    @ViewChild("modelTabs")
    modelTabsRef?: ElementRef<StvModelTabsComponent>;
    
    get modelTabs(): StvModelTabsComponent {
        return this.modelTabsRef! as unknown as StvModelTabsComponent;
    }
    
    private appStateSubscription: Subscription;
    
    constructor(private appState: state.AppState) {
        this.appStateSubscription = appState.state$
            .pipe(debounce(() => interval(10)))
            .subscribe(() => this.onAppStateChanged());
    }

    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
    }
    
    ngOnDestroy(): void {
        this.appStateSubscription.unsubscribe();
    }
    
    onAppStateChanged(): void {
        const model = this.getAssumptionModel();
        this.modelTabs.setModel(model);
        this.modelTabs.currentTabId.subscribe(next => this.onTabChange(next));
    }

    onTabChange(modelId: string) {
        this.getAssumptionState().modelId = modelId;
    }
    
    private getAssumptionState(): state.actions.Assumption {
        return this.appState.action as state.actions.Assumption;
    }
    
    private getAssumptionModel(): state.models.File {
        return this.getAssumptionState().model as state.models.File;
    }
    
    private getAssumptionnModelParameters(): state.models.parameters.File {
        return this.getAssumptionModel().parameters;
    }
    
}
