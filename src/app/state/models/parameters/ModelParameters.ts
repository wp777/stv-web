import * as Types from "stv-types";
import { ObservableState } from "../../ObservableState";

export abstract class ModelParameters<T extends Types.models.parameters.ModelParameters> extends ObservableState<T> {
    
    abstract getPlainModelParameters(): T;
    
    abstract areModelParametersValid(): boolean;
    
}
