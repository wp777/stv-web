import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";
import { ConfigProvider } from "src/app/config.provider";

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
        const config = ConfigProvider.instance.getConfig().parameterizedModels.castles;
        return Validation.isInteger(this.castle1Size) && Validation.isIntegerInRange(this.castle1Size, config.min.castle1Size, config.max.castle1Size)
            && Validation.isInteger(this.castle2Size) && Validation.isIntegerInRange(this.castle2Size, config.min.castle2Size, config.max.castle2Size)
            && Validation.isInteger(this.castle3Size) && Validation.isIntegerInRange(this.castle3Size, config.min.castle3Size, config.max.castle3Size)
            && Validation.isInteger(this.life) && Validation.isIntegerInRange(this.life, config.min.life, config.max.life);
    }
    
}
