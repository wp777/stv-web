import * as models from "../models";
import { Action } from "./Action";

interface ReductionObservableProperties {
    model: unknown;
}

export class Reduction extends Action<ReductionObservableProperties> {
    
    protected _model: models.SomeModel = this.createObservedChild(new models.File());
    get model(): models.SomeModel { return this._model; }
    set model(model: models.SomeModel) { this.setParameter("model", model); }
    
    canGenerateGlobalModel(): boolean {
        return this.model.parameters.areModelParametersValid();
    }
    
    canGenerateReducedModel(): boolean {
        return this.model.parameters.areModelParametersValid();
    }
    
    canVerifyGlobalModel(): boolean {
        return this.model.globalModel !== null;
    }
    
    canVerifyReducedModel(): boolean {
        return this.model.reducedModel !== null;
    }
    
}
