import * as parameters from "./parameters";
import { Model } from "./Model";

export class BridgeEndplay extends Model<parameters.BridgeEndplay> {
    
    static readonly DEFAULT_FORMULA: string = "<<N>>F win";
    
    constructor() {
        super(new parameters.BridgeEndplay());
    }
    
}
