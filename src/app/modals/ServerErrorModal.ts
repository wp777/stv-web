import { FileSizeErrorModal } from "./FileSizeErrorModal";
import { Modal } from "./Modal";

export interface ServerErrorMessage {
    errorMessage: string;
    extra?: string;
}

export class ServerErrorModal extends Modal {
    
    constructor(errorMessage: ServerErrorMessage) {
        super(
            "Error",
            `
                <div class="main-message">
                    Error: <strong>${errorMessage.errorMessage}</strong>.
                </div>
                <div class="extra-message">
                    ${errorMessage.extra ? errorMessage.extra : ""}
                </div>
            `,
        );
    }
    
    static formatErrorMessage(erorStr: string): ServerErrorMessage {
        let error: any = null;
        try {
            error = JSON.parse(erorStr);
            if (!error.type) {
                error = null;
            }
        }
        catch {}
        
        if (error === null) {
            return {
                errorMessage: erorStr,
            };
        }
        
        switch (error.type) {
            case "ComputeError": {
                return {
                    errorMessage: "unknown compute error",
                    extra: error.errorString,
                };
            };
            case "DuplicatePropertyError": {
                return {
                    errorMessage: `duplicate property "${error.propertyName}"`,
                };
            };
            case "FileFormatError": {
                return {
                    errorMessage: `"${error.fileId}" file is in wrong format`,
                };
            };
            case "FileSizeError": {
                return {
                    errorMessage: `"${error.fileName}" file is too large`,
                    extra: `File size: ${this.formatFileSize(error.fileSize)}; maximum size: ${this.formatFileSize(error.maxFileSize)}.`,
                };
            };
            case "MaxExecutionTimeExceededError": {
                return {
                    errorMessage: "maximum computation time was exceeded",
                    extra: "Try using a less complex model.",
                };
            };
            case "MaxNumberExceededError": {
                return {
                    errorMessage: `value of parameter "${error.parameterName}" is too large`,
                    extra: `Entered value: ${error.value}; maximum value: ${error.maxValue}`,
                };
            };
            case "ParameterRangeError": {
                return {
                    errorMessage: `value of parameter "${error.parameterName}" is out of range`,
                    extra: `Entered value: ${error.value}; range: ${error.minValue} - ${error.maxValue}`,
                };
            };
            case "UnknownError": {
                return {
                    errorMessage: `unknown error`,
                    extra: error.extra,
                };
            };
            default: {
                return {
                    errorMessage: "unknown error",
                    extra: JSON.stringify(error),
                };
            };
        }
    }
    
    static formatFileSize(bytes: number): string {
        return FileSizeErrorModal.formatFileSize(bytes);
    }
    
}
