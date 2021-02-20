import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";

export class TianJi extends ModelParameters<Types.models.parameters.TianJi> {
    
    protected _horses: number = 1;
    get horses(): number { return this._horses; }
    set horses(horses: number) { this.setParameter("horses", horses); }
    
    getPlainModelParameters(): Types.models.parameters.TianJi {
        return {
            type: "tianJi",
            horses: this.horses,
        };
    }
    
    areModelParametersValid(): boolean {
        return Validation.isPositiveInteger(this.horses);
    }
    
}
