import { Modal } from "./Modal";

export class FileSizeErrorModal extends Modal {
    
    constructor(fileSizeBytes: number, maxFileSizeBytes: number) {
        super(
            "The file is too large",
            `
                <div class="main-message">
                    File size: <strong>${FileSizeErrorModal.formatFileSize(fileSizeBytes)}</strong><br />
                    Max file size: <strong>${FileSizeErrorModal.formatFileSize(maxFileSizeBytes)}</strong>
                </div>
            `,
        );
    }
    
    static formatFileSize(bytes: number): string {
        if (bytes > 1024 * 1024 * 1024) {
            return `${this.roundBytes(bytes / (1024 * 1024 * 1024))} GiB`;
        }
        if (bytes > 1024 * 1024) {
            return `${this.roundBytes(bytes / (1024 * 1024))} MiB`;
        }
        if (bytes > 1024) {
            return `${this.roundBytes(bytes / (1024))} KiB`;
        }
        return `${this.roundBytes(bytes)} B`;
    }
    
    private static roundBytes(bytes: number): number {
        return Math.round(bytes * 100) / 100;
    }
    
}
