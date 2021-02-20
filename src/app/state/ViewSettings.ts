import { Subject } from "rxjs";

export class ViewSettings {
    
    static readonly ZOOM_LEVELS: number[] = new Array(21).fill(0).map((_, i) => Math.pow(1.2, i - 10));
    static readonly DEFAULT_ZOOM_LEVEL_ID: number = ViewSettings.ZOOM_LEVELS.indexOf(1);
    protected _graphZoomLevelId: number = ViewSettings.DEFAULT_ZOOM_LEVEL_ID;
    get graphZoomLevelId(): number { return this._graphZoomLevelId; }
    set graphZoomLevelId(graphZoomLevelId: number) { 
        if (graphZoomLevelId === this._graphZoomLevelId) {
            return;
        }
        if (graphZoomLevelId < 0 || graphZoomLevelId >= ViewSettings.ZOOM_LEVELS.length) {
            return;
        }
        this._graphZoomLevelId = graphZoomLevelId;
        this.graphZoom$.next();
        this.updateCanZoomIn();
        this.updateCanZoomOut();
    }
    get graphZoom(): number { return ViewSettings.ZOOM_LEVELS[this.graphZoomLevelId]; }
    graphZoom$: Subject<void> = new Subject<void>();
    
    protected _lastCanZoomIn: boolean = true;
    get canZoomIn(): boolean { return this.graphZoomLevelId + 1 < ViewSettings.ZOOM_LEVELS.length; }
    canZoomIn$: Subject<void> = new Subject<void>();
    protected updateCanZoomIn(): void {
        const canZoomIn = this.canZoomIn;
        if (canZoomIn === this._lastCanZoomIn) {
            return;
        }
        this._lastCanZoomIn = canZoomIn;
        this.canZoomIn$.next();
    }
    
    protected _lastCanZoomOut: boolean = true;
    get canZoomOut(): boolean { return this.graphZoomLevelId > 0; }
    canZoomOut$: Subject<void> = new Subject<void>();
    protected updateCanZoomOut(): void {
        const canZoomOut = this.canZoomOut;
        if (canZoomOut === this._lastCanZoomOut) {
            return;
        }
        this._lastCanZoomOut = canZoomOut;
        this.canZoomOut$.next();
    }
    
    protected _showStateLabels: boolean = false;
    get showStateLabels(): boolean { return this._showStateLabels; }
    set showStateLabels(showStateLabels: boolean) {
        if (showStateLabels === this._showStateLabels) {
            return;
        }
        this._showStateLabels = showStateLabels;
        this.showStateLabels$.next();
    }
    showStateLabels$: Subject<void> = new Subject<void>();
    
    protected _showActions: boolean = false;
    get showActions(): boolean { return this._showActions; }
    set showActions(showActions: boolean) {
        if (showActions === this._showActions) {
            return;
        }
        this._showActions = showActions;
        this.showActions$.next();
    }
    showActions$: Subject<void> = new Subject<void>();
    
}
