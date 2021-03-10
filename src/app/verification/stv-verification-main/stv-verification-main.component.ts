import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import * as state from "src/app/state";
import { StvModelTabsComponent } from "src/app/common/stv-model-tabs/stv-model-tabs.component";

@Component({
    selector: "stv-verification-main",
    templateUrl: "./stv-verification-main.component.html",
    styleUrls: ["./stv-verification-main.component.less"],
})
export class StvVerificationMainComponent implements OnInit, OnDestroy, AfterViewInit {
    
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
        const model = this.getVerificationModel();
        this.modelTabs.setModel(model);
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.SomeModel {
        return this.getVerificationState().model as state.models.SomeModel;
    }
    
    private getVerificationModelParameters(): state.models.parameters.SomeParameters {
        return this.getVerificationModel().parameters;
    }
}
