import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";
import { ConfigProvider } from "src/app/config.provider";

export class BridgeEndplay extends ModelParameters<Types.models.parameters.BridgeEndplay> {
    
    protected _cardsInHand: number = 1;
    get cardsInHand(): number { return this._cardsInHand; }
    set cardsInHand(cardsInHand: number) { this.setParameter("cardsInHand", cardsInHand); }
    
    protected _deckSize: number = 1;
    get deckSize(): number { return this._deckSize; }
    set deckSize(deckSize: number) { this.setParameter("deckSize", deckSize); }
    
    getPlainModelParameters(): Types.models.parameters.BridgeEndplay {
        return {
            type: "bridgeEndplay",
            cardsInHand: this.cardsInHand,
            deckSize: this.deckSize,
        };
    }
    
    areModelParametersValid(): boolean {
        const config = ConfigProvider.instance.getConfig().parameterizedModels.bridgeEndplay;
        return Validation.isInteger(this.deckSize) && Validation.isIntegerInRange(this.deckSize, config.min.deckSize, config.max.deckSize)
            && Validation.isInteger(this.cardsInHand) && Validation.isIntegerInRange(this.cardsInHand, config.min.cardsInHand, config.max.cardsInHand);
    }
    
}