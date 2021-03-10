import * as models from "../models";
import { Action } from "./Action";

interface BisimulationObservableProperties {
    model1: unknown;
    model2: unknown;
    specification: unknown;
}

export class Bisimulation extends Action<BisimulationObservableProperties> {
    
    protected _model1: models.SomeModel = this.createObservedChild(new models.File());
    get model1(): models.SomeModel { return this._model1; }
    set model1(model1: models.SomeModel) { this.setParameter("model1", model1); }
    
    protected _model2: models.SomeModel = this.createObservedChild(new models.File());
    get model2(): models.SomeModel { return this._model2; }
    set model2(model2: models.SomeModel) { this.setParameter("model2", model2); }
    
    protected _specification: models.parameters.File = this.createObservedChild(new models.parameters.File());
    get specification(): models.parameters.File { return this._specification; }
    set specification(specification: models.parameters.File) { this.setParameter("specification", specification); }
    
    canGenerateModel(): boolean {
        return this.model1.parameters.areModelParametersValid()
            && this.model2.parameters.areModelParametersValid();
    }
    
    canVerifyModel1(): boolean {
        return this.model1.globalModel !== null;
    }
    
    canVerifyModel2(): boolean {
        return this.model2.globalModel !== null;
    }
    
    canCheckBisimulation(): boolean {
        return this.model1.globalModel !== null
            && this.model2.globalModel !== null
            && this.specification.areModelParametersValid();
    }
    
}
