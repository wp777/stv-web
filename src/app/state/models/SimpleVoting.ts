import * as parameters from "./parameters";
import { Model } from "./Model";

export class SimpleVoting extends Model<parameters.SimpleVoting> {
    
    static readonly DEFAULT_FORMULA: string = "<<Voter_1>>F (finish_1 & ~pun_1 & ~vote_{1,1})";
    
    constructor() {
        super(new parameters.SimpleVoting());
    }
    
}
