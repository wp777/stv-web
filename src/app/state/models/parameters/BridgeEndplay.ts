import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";

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
        return Validation.isPositiveInteger(this.deckSize)
            && Validation.isPositiveInteger(this.cardsInHand);
    }
    
}