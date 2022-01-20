import * as Types from "stv-types";
import * as models from "../models";
import { Action } from "./Action";

interface AssumptionObservableProperties {
    model: unknown;
    dominoDfsHeuristic: unknown;
    modelId: unknown;
}

export class Assumption extends Action<AssumptionObservableProperties> {

    public _modelId: string = "";
    get modelId(): string {return this._modelId;}
    set modelId(modelId: string) {this.setParameter("modelId", modelId); }
    
    protected _model: models.SomeModel = this.createObservedChild(new models.File());
    get model(): models.SomeModel { return this._model; }
    set model(model: models.SomeModel) { this.setParameter("model", model); }
    
    protected _dominoDfsHeuristic: Types.actions.DominoDfsHeuristic = "basic";
    get dominoDfsHeuristic(): Types.actions.DominoDfsHeuristic { return this._dominoDfsHeuristic; }
    set dominoDfsHeuristic(dominoDfsHeuristic: Types.actions.DominoDfsHeuristic) { this.setParameter("dominoDfsHeuristic", dominoDfsHeuristic); }
    
    canGenerateModel(): boolean {
        return this.model.parameters.areModelParametersValid();
    }
    
    canVerifyModel(): boolean {
        return this.model.globalModel !== null;
    }
}
