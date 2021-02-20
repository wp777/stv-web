import * as parameters from "./parameters";
import { Model } from "./Model";

export class File extends Model<parameters.File> {
    
    constructor() {
        super(new parameters.File());
    }
    
}
