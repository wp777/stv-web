import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import * as state from "src/app/state";
import * as cytoscape from "cytoscape";

@Component({
    selector: "stv-verification-main",
    templateUrl: "./stv-verification-main.component.html",
    styleUrls: ["./stv-verification-main.component.less"],
})
export class StvVerificationMainComponent implements OnInit, OnDestroy {
    
    @ViewChild("graphContainer")
    graphContainer?: ElementRef;
    
    private viewSettingsSubscriptions: Subscription[] = [];
    
    constructor(private appState: state.AppState) {
        const viewSettings = appState.viewSettings;
        this.viewSettingsSubscriptions.push(appState.state$.pipe(debounce(() => interval(10))).subscribe(() => this.onAppStateChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.graphZoom$.subscribe(() => this.onGraphZoomChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.showActions$.subscribe(() => this.onShowActionsChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.showStateLabels$.subscribe(() => this.onShowStateChanged()));
    }

    ngOnInit(): void {}
    
    ngOnDestroy(): void {
        for (let subscription of this.viewSettingsSubscriptions) {
            subscription.unsubscribe();
        }
    }
    
    onAppStateChanged(): void {
        const graphContainer = this.graphContainer?.nativeElement as HTMLDivElement | undefined;
        if (!graphContainer) {
            return;
        }
        const model = this.getVerificationModel();
        if (!model.globalModel) {
            graphContainer.innerHTML = "";
            return;
        }
        // @todo
        console.log(graphContainer, model);
        const cy = cytoscape({
            container: graphContainer,
            elements: [
                { data: { id: "a" } },
                { data: { id: "b" } },
                { data: { id: "c" } },
                { data: { id: "d" } },
                { data: { id: "e" } },
                { data: { id: "f" } },
                // edges
                {
                    data: {
                        id: "ab",
                        source: "a",
                        target: "b",
                    },
                },
                {
                    data: {
                        id: "cd",
                        source: "c",
                        target: "d",
                    },
                },
                {
                    data: {
                        id: "ef",
                        source: "e",
                        target: "f",
                    },
                },
                {
                    data: {
                        id: "ac",
                        source: "a",
                        target: "c",
                    },
                },
                {
                    data: {
                        id: "be",
                        source: "b",
                        target: "e",
                    },
                },
            ],
        });
    }
    
    onGraphZoomChanged(): void {
        // @todo
        console.log("onGraphZoomChanged", this.appState.viewSettings.graphZoom);
    }
    
    onShowActionsChanged(): void {
        // @todo
        console.log("onShowActionsChanged", this.appState.viewSettings.showActions);
    }
    
    onShowStateChanged(): void {
        // @todo
        console.log("onShowStateChanged", this.appState.viewSettings.showStateLabels);
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
