import * as parameters from "./parameters";
import { Model } from "./Model";

export class TianJi extends Model<parameters.TianJi> {
    
    static readonly DEFAULT_FORMULA: string = "<<TianJi>>F Win";
    
    constructor() {
        super(new parameters.TianJi());
    }
    
}
