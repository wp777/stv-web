import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";

export class SimpleVoting extends ModelParameters<Types.models.parameters.SimpleVoting> {
    
    protected _candidates: number = 1;
    get candidates(): number { return this._candidates; }
    set candidates(candidates: number) { this.setParameter("candidates", candidates); }
    
    protected _voters: number = 1;
    get voters(): number { return this._voters; }
    set voters(voters: number) { this.setParameter("voters", voters); }
    
    getPlainModelParameters(): Types.models.parameters.SimpleVoting {
        return {
            type: "simpleVoting",
            candidates: this.candidates,
            voters: this.voters,
        };
    }
    
    areModelParametersValid(): boolean {
        return Validation.isPositiveInteger(this.candidates)
            && Validation.isPositiveInteger(this.voters);
    }
    
}
