import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";
import { ConfigProvider } from "src/app/config.provider";

export class TianJi extends ModelParameters<Types.models.parameters.TianJi> {
    
    protected _horses: number = 1;
    get horses(): number { return this._horses; }
    set horses(horses: number) { this.setParameter("horses", horses); }
    
    constructor() {
        super();
    }
    
    getPlainModelParameters(): Types.models.parameters.TianJi {
        return {
            type: "tianJi",
            horses: this.horses,
        };
    }
    
    areModelParametersValid(): boolean {
        const config = ConfigProvider.instance.getConfig().parameterizedModels.tianJi;
        return Validation.isInteger(this.horses) && Validation.isIntegerInRange(this.horses, config.min.horses, config.max.horses);
    }
    
}
