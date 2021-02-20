import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";

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
        return Validation.isPositiveInteger(this.initialEnergy)
            && Validation.isPositiveInteger(this.numberOfDrones);
    }
    
}
