import { Injectable } from "@angular/core";
import { StvGraphService } from "../common/stv-graph/stv-graph.service";
import * as actions from "./actions";
import { ObservableState } from "./ObservableState";
import { ViewSettings } from "./ViewSettings";

interface AppStateObservableProperties {
    action: unknown;
    currentGraphService: unknown;
}

@Injectable({
    providedIn: "root",
})
export class AppState extends ObservableState<AppStateObservableProperties> {
    
    protected _action: actions.SomeAction = this.createObservedChild(new actions.Verification());
    get action(): actions.SomeAction { return this._action; }
    set action(action: actions.SomeAction) { this.setParameter("action", action); }
    
    protected _viewSettings: ViewSettings = new ViewSettings();
    get viewSettings(): ViewSettings { return this._viewSettings; }
    
    protected _currentGraphService: StvGraphService | null = null;
    get currentGraphService(): StvGraphService | null {return this._currentGraphService;}
    set currentGraphService(currentGraphService: StvGraphService | null) {this.setParameter("currentGraphService", currentGraphService); }
}
