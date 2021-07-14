import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";
import { ConfigProvider } from "src/app/config.provider";

export class Drones extends ModelParameters<Types.models.parameters.Drones> {
    
    protected _initialEnergy: number = 1;
    get initialEnergy(): number { return this._initialEnergy; }
    set initialEnergy(initialEnergy: number) { this.setParameter("initialEnergy", initialEnergy); }
    
    protected _numberOfDrones: number = 1;
    get numberOfDrones(): number { return this._numberOfDrones; }
    set numberOfDrones(numberOfDrones: number) { this.setParameter("numberOfDrones", numberOfDrones); }
    
    getPlainModelParameters(): Types.models.parameters.Drones {
        return {
            type: "drones",
            initialEnergy: this.initialEnergy,
            numberOfDrones: this.numberOfDrones,
        };
    }
    
    areModelParametersValid(): boolean {
        const config = ConfigProvider.instance.getConfig().parameterizedModels.drones;
        return Validation.isInteger(this.initialEnergy) && Validation.isIntegerInRange(this.initialEnergy, config.min.initialEnergy, config.max.initialEnergy)
            && Validation.isInteger(this.numberOfDrones) && Validation.isIntegerInRange(this.numberOfDrones, config.min.numberOfDrones, config.max.numberOfDrones);
    }
    
}
