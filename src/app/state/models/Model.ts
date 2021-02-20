import * as graph from "./graph";
import * as parameters from "./parameters";
import { ObservableState } from "../ObservableState";

interface ModelObservableProperties {
    parameters: unknown;
    formula: unknown;
    globalModel: unknown;
    reducedModel: unknown;
    localModels: unknown;
    localModelNames: unknown;
}

export abstract class Model<T extends parameters.SomeParameters> extends ObservableState<ModelObservableProperties> {
    
    static readonly DEFAULT_FORMULA: string | null =null;
    
    protected _parameters: T;
    get parameters(): T { return this._parameters; }
    set parameters(parameters: T) { this.setParameter("parameters", parameters); }
    
    protected _formula: string | null = (this.constructor as any).DEFAULT_FORMULA;
    get formula(): string | null { return this._formula; }
    set formula(formula: string | null) { this.setParameter("formula", formula); }
    
    protected _globalModel: graph.Graph | null = null;
    get globalModel(): graph.Graph | null { return this._globalModel; }
    set globalModel(globalModel: graph.Graph | null) { this.setParameter("globalModel", globalModel); }
    
    protected _reducedModel: graph.Graph | null = null;
    get reducedModel(): graph.Graph | null { return this._reducedModel; }
    set reducedModel(reducedModel: graph.Graph | null) { this.setParameter("reducedModel", reducedModel); }
    
    protected _localModels: graph.Graph[] | null = null;
    get localModels(): graph.Graph[] | null { return this._localModels; }
    set localModels(localModels: graph.Graph[] | null) { this.setParameter("localModels", localModels); }
    
    protected _localModelNames: string[] | null = null;
    get localModelNames(): string[] | null { return this._localModelNames; }
    set localModelNames(localModelNames: string[] | null) { this.setParameter("localModelNames", localModelNames); }
    
    constructor(parameters: T) {
        super();
        this._parameters = this.createObservedChild(parameters);
    }
    
    protected observeChild(child: ObservableState<any>): void {
        super.observeChild(child);
        child.state$.subscribe(() => {
            this.globalModel = null;
            this.reducedModel = null;
            this.localModelNames = null;
            this.localModels = null;
            this.formula = (this.constructor as any).DEFAULT_FORMULA;
        });
    }
    
}
