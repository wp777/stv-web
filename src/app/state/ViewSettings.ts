import { Subject } from "rxjs";

export class ViewSettings {
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
    
    reset(): void{
        this.showActions = false;
        this.showStateLabels = false;        
    }
}