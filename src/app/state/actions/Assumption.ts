import * as Types from "stv-types";
import * as models from "../models";
import { Action } from "./Action";

interface AssumptionObservableProperties {
    model: unknown;
    dominoDfsHeuristicGlobal: unknown;
    dominoDfsHeuristicReduced: unknown;
}

export class Assumption extends Action<AssumptionObservableProperties> {
    
    protected _model: models.SomeModel = this.createObservedChild(new models.File());
    get model(): models.SomeModel { return this._model; }
    set model(model: models.SomeModel) { this.setParameter("model", model); }
    
    protected _dominoDfsHeuristicGlobal: Types.actions.DominoDfsHeuristic = "basic";
    get dominoDfsHeuristicGlobal(): Types.actions.DominoDfsHeuristic { return this._dominoDfsHeuristicGlobal; }
    set dominoDfsHeuristicGlobal(dominoDfsHeuristicGlobal: Types.actions.DominoDfsHeuristic) { this.setParameter("dominoDfsHeuristicGlobal", dominoDfsHeuristicGlobal); }
    
    protected _dominoDfsHeuristicReduced: Types.actions.DominoDfsHeuristic = "basic";
    get dominoDfsHeuristicReduced(): Types.actions.DominoDfsHeuristic { return this._dominoDfsHeuristicReduced; }
    set dominoDfsHeuristicReduced(dominoDfsHeuristicReduced: Types.actions.DominoDfsHeuristic) { this.setParameter("dominoDfsHeuristicReduced", dominoDfsHeuristicReduced); }
    
    canGenerateModel(): boolean {
        return this.model.parameters.areModelParametersValid();
    }
    
    canVerifyGlobalModel(): boolean {
        return this.model.globalModel !== null;
    }
    
    canVerifyReducedModel(): boolean {
        return this.model.reducedModel !== null;
    }
    
}
