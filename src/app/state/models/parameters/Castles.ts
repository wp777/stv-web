import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";

export class Castles extends ModelParameters<Types.models.parameters.Castles> {

    protected _castle1Size: number = 1;
    get castle1Size(): number { return this._castle1Size; }
    set castle1Size(castle1Size: number) { this.setParameter("castle1Size", castle1Size); }
    
    protected _castle2Size: number = 1;
    get castle2Size(): number { return this._castle2Size; }
    set castle2Size(castle2Size: number) { this.setParameter("castle2Size", castle2Size); }
    
    protected _castle3Size: number = 1;
    get castle3Size(): number { return this._castle3Size; }
    set castle3Size(castle3Size: number) { this.setParameter("castle3Size", castle3Size); }
    
    protected _life: number = 1;
    get life(): number { return this._life; }
    set life(life: number) { this.setParameter("life", life); }
    
    getPlainModelParameters(): Types.models.parameters.Castles {
        return {
            type: "castles",
            castle1Size: this.castle1Size,
            castle2Size: this.castle2Size,
            castle3Size: this.castle3Size,
            life: this.life,
        };
    }
    
    areModelParametersValid(): boolean {
        return Validation.isPositiveInteger(this.castle1Size)
            && Validation.isPositiveInteger(this.castle2Size)
            && Validation.isPositiveInteger(this.castle3Size)
            && Validation.isPositiveInteger(this.life);
    }
    
}
