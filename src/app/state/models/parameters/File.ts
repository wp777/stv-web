import * as Types from "stv-types";
import { ModelParameters } from "./ModelParameters";
import { Validation } from "src/app/utils";
import { ConfigProvider } from "src/app/config.provider";

export class File extends ModelParameters<Types.models.parameters.File> {
    
    protected _modelString: string = "";
    get modelString(): string { return this._modelString; }
    set modelString(modelString: string) { this.setParameter("modelString", modelString); }
    
    getPlainModelParameters(): Types.models.parameters.File {
        return {
            type: "file",
            modelString: this.modelString,
        };
    }
    
    areModelParametersValid(): boolean {
        const config = ConfigProvider.instance.getConfig().fileModel;
        return Validation.isNonEmptyString(this.modelString) && Validation.isStringLengthInRange(this.modelString, ConfigProvider.UNLIMITED, config.maxFileSizeBytes);
    }
    
}
