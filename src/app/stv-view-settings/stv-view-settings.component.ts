import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as state from "../state";
import { StvGraphService } from "../common/stv-graph/stv-graph.service"

@Component({
    selector: "stv-view-settings",
    templateUrl: "./stv-view-settings.component.html",
    styleUrls: ["./stv-view-settings.component.less"],
})
export class StvViewSettingsComponent implements OnInit, OnDestroy {
    
    showActions: boolean;
    showStateLabels: boolean;
    canZoomIn: boolean;
    canZoomOut: boolean;
    
    private viewSettingsSubscriptions: Subscription[] = [];
    
    constructor(private appState: state.AppState, private graphService: StvGraphService) {
        const viewSettings = appState.viewSettings;
        this.showActions = viewSettings.showActions;
        this.showStateLabels = viewSettings.showStateLabels;
        this.canZoomIn = viewSettings.canZoomIn;
        this.canZoomOut = viewSettings.canZoomOut;
        this.viewSettingsSubscriptions.push(viewSettings.showActions$.subscribe(() => this.showActions = viewSettings.showActions));
        this.viewSettingsSubscriptions.push(viewSettings.showStateLabels$.subscribe(() => this.showStateLabels = viewSettings.showStateLabels));
        // this.viewSettingsSubscriptions.push(viewSettings.canZoomIn$.subscribe(() => this.canZoomIn = viewSettings.canZoomIn));
        // this.viewSettingsSubscriptions.push(viewSettings.canZoomOut$.subscribe(() => this.canZoomOut = viewSettings.canZoomOut));
    }

    ngOnInit(): void {}
    
    ngOnDestroy(): void {
        for (let subscription of this.viewSettingsSubscriptions) {
            subscription.unsubscribe();
        }
    }
    
    onShowActionsChanged(): void {
        this.appState.viewSettings.showActions = !this.appState.viewSettings.showActions;
        this.graphService.toggleActionLabels();
    }
    
    onShowStateLabelsChanged(): void {
        this.appState.viewSettings.showStateLabels = !this.appState.viewSettings.showStateLabels;
        this.graphService.toggleStateLabels();
    }
    
    onZoomInClick(): void {
        this.graphService.updateZoom(1.2);
    }
    
    onZoomOutClick(): void {
        this.graphService.updateZoom(1/1.2);
    }

    onZoomToFitClick(): void{
        this.graphService.zoomToFit()
    }
    
}
