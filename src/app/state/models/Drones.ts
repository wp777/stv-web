import * as parameters from "./parameters";
import { Model } from "./Model";

export class Drones extends Model<parameters.Drones> {
    
    static readonly DEFAULT_FORMULA: string = "<<D>>F visited>=2";
    
    constructor() {
        super(new parameters.Drones());
    }
    
}
