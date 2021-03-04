import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import * as state from "src/app/state";
import { StvModelTabsComponent } from "src/app/common/stv-model-tabs/stv-model-tabs.component";

@Component({
    selector: "stv-reduction-main",
    templateUrl: "./stv-reduction-main.component.html",
    styleUrls: ["./stv-reduction-main.component.less"],
})
export class StvReductionMainComponent implements OnInit, OnDestroy, AfterViewInit {
    
    @ViewChild("modelTabs")
    modelTabsRef?: ElementRef<StvModelTabsComponent>;
    
    get modelTabs(): StvModelTabsComponent {
        return this.modelTabsRef! as unknown as StvModelTabsComponent;
    }
    
    private appStateSubscription: Subscription;
    
    constructor(private appState: state.AppState) {
        this.appStateSubscription = appState.state$.pipe(debounce(() => interval(10))).subscribe(() => this.onAppStateChanged());
    }

    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
    }
    
    ngOnDestroy(): void {
        this.appStateSubscription.unsubscribe();
    }
    
    onAppStateChanged(): void {
        const model = this.getReductionModel();
        this.modelTabs.setModel(model);
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
