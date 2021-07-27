import { FileSizeErrorModal } from "./FileSizeErrorModal";
import { ServerErrorModal } from "./ServerErrorModal";

export class ErrorModals {
    
    static showForServerError(serverErrorMessage: string): void {
        new ServerErrorModal(ServerErrorModal.formatErrorMessage(serverErrorMessage)).show();
    }
    
    static showFileSizeError(fileSizeBytes: number, maxFileSizeBytes: number): void {
        new FileSizeErrorModal(fileSizeBytes, maxFileSizeBytes).show();
    }
    
}
