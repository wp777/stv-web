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
    
    private viewSettingsSubscriptions: Subscription[] = [];
    
    constructor(private appState: state.AppState, private graphService: StvGraphService) {
        const viewSettings = appState.viewSettings;
        this.showActions = viewSettings.showActions;
        this.showStateLabels = viewSettings.showStateLabels;
        this.viewSettingsSubscriptions.push(
            viewSettings.showActions$.subscribe(() => this.showActions = viewSettings.showActions)
        );
        this.viewSettingsSubscriptions.push(
            viewSettings.showStateLabels$.subscribe(() => this.showStateLabels = viewSettings.showStateLabels)
        );
    }

    get stateLabels(): Array<any>{
        return this.graphService.stateLabels;
    }

    get actionLabels(): Array<any>[]{
        return this.graphService.actionLabels;
    }

    get allStateLabelsShown(): Boolean{
        return this.graphService.stateLabels.reduce((acc,x)=>acc&&x.val, true);
    }

    get allActionLabelsShown(): Boolean{
        return this.graphService.actionLabels.reduce((acc,x)=>acc&&x.val, true);
    }

    onSingleStateLabelChanged(i: any):void{
        this.graphService.stateLabels[i].val = !this.graphService.stateLabels[i].val;
        this.graphService.reloadStateLabels();
    }
    
    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
        for (let subscription of this.viewSettingsSubscriptions) {
            subscription.unsubscribe();
        }
    }

    
    onShowActionsChanged(): void {
        this.appState.viewSettings.showActions = !this.appState.viewSettings.showActions;
        this.graphService.actionLabels.forEach(x=>x.val=this.appState.viewSettings.showActions);
        // this.graphService.toggleActionLabels();
        this.graphService.reloadActionLabels();
    }
    
    onShowStateLabelsChanged(): void {
        this.appState.viewSettings.showStateLabels = !this.appState.viewSettings.showStateLabels;
        this.graphService.stateLabels.forEach(x=>x.val=this.appState.viewSettings.showStateLabels);

        // this.graphService.toggleStateLabels();
        this.graphService.reloadStateLabels();
    }
    
    onZoomInClick(): void {
        this.graphService.setZoom(1.2);
    }
    
    onZoomOutClick(): void {
        this.graphService.setZoom(1 / 1.2);
    }
    
    onZoomToFitClick(): void{
        this.graphService.zoomToFit();
    }
    
}
