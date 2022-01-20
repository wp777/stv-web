import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as state from "../state";
import { StvGraphService } from "../common/stv-graph/stv-graph.service"

@Component({
    selector: "stv-view-settings",
    templateUrl: "./stv-view-settings.component.html",
    styleUrls: ["./stv-view-settings.component.less"],
    providers: [StvGraphService]
})
export class StvViewSettingsComponent implements OnInit, OnDestroy {
    showStateLabels: boolean;
    showActionLabels: boolean;
    
    private viewSettingsSubscriptions: Subscription[] = [];
    
    constructor(private appState: state.AppState) {
        const viewSettings = appState.viewSettings;
        this.showActionLabels = viewSettings.showActions;
        this.showStateLabels = viewSettings.showStateLabels;
        this.viewSettingsSubscriptions.push(
            viewSettings.showActions$.subscribe(() => this.showActionLabels = viewSettings.showActions)
        );
        this.viewSettingsSubscriptions.push(
            viewSettings.showStateLabels$.subscribe(() => this.showStateLabels = viewSettings.showStateLabels)
        );
    }

    get stateLabels(): Array<any>{
        return this.appState.currentGraphService?.stateLabels || [];
    }

    get actionLabels(): Array<any>{
        return this.appState.currentGraphService?.actionLabels || [];
    }

    get allStateLabelsShown(): Boolean{
        return this.appState.currentGraphService?.stateLabels.reduce((acc,x)=>acc&&x.display, true);
    }

    get allActionLabelsShown(): Boolean{
        return this.appState.currentGraphService?.actionLabels.reduce((acc,x)=>acc&&x.display, true);
    }

    onShowAllStateLabelsChanged(e:Event):void{     
        let _val = (<HTMLInputElement>e.target).checked;
        this.appState.currentGraphService?.stateLabels.forEach(x=>x.display = _val);
        this.appState.currentGraphService?.reloadStateLabels();
    }

    onSingleStateLabelChanged(i: any, e:Event):void{     
        let _val = (<HTMLInputElement>e.target).checked;
        if(this.appState.currentGraphService) {
            this.appState.currentGraphService.stateLabels[i].display = _val;
        }
        this.appState.currentGraphService?.reloadStateLabels();
    }


    onShowAllActionLabelsChanged(e:Event):void{     
        let _val = (<HTMLInputElement>e.target).checked;
        this.appState.currentGraphService?.actionLabels.forEach(x=>x.display = _val);
        this.appState.currentGraphService?.reloadActionLabels();
    }


    onSingleActionLabelChanged(i: any, e:Event):void{
        let _val = (<HTMLInputElement>e.target).checked;
        if(this.appState.currentGraphService) {
            this.appState.currentGraphService.actionLabels[i].display = _val;
        }
        this.appState.currentGraphService?.reloadActionLabels();
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
        this.appState.currentGraphService?.actionLabels.forEach(x=>x.display=this.appState.viewSettings.showActions);
        // this.graphService.toggleActionLabels();
        this.appState.currentGraphService?.reloadActionLabels();
    }
    
    onShowStateLabelsChanged(): void {
        this.appState.viewSettings.showStateLabels = !this.appState.viewSettings.showStateLabels;
        this.appState.currentGraphService?.stateLabels.forEach(x=>x.display=this.appState.viewSettings.showStateLabels);

        // this.graphService.toggleStateLabels();
        this.appState.currentGraphService?.reloadStateLabels();
    }
    
    onZoomInClick(): void {
        this.appState.currentGraphService?.setZoom(1.2);
    }
    
    onZoomOutClick(): void {
        this.appState.currentGraphService?.setZoom(1 / 1.2);
    }
    
    onZoomToFitClick(): void{
        this.appState.currentGraphService?.zoomToFit();
    }
    
}