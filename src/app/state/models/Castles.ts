import * as parameters from "./parameters";
import { Model } from "./Model";

export class Castles extends Model<parameters.Castles> {
    
    static readonly DEFAULT_FORMULA: string = "<<C1>>F Castle3Defeated";
    
    constructor() {
        super(new parameters.Castles());
    }
    
}
