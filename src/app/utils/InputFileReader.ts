import { StvFileInputComponent } from "../common/stv-file-input/stv-file-input.component";
import { ErrorModals } from "../modals/ErrorModals";

export class InputFileReader {
    
    static async read(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder("utf-8");
        const fileContent = textDecoder.decode(arrayBuffer);
        return fileContent;
    }
    
    static async readWithFileSizeVerification(fileList: FileList, maxFileSizeBytes: number | "", fileInput: StvFileInputComponent): Promise<string> {
        let modelString = "";
        if (fileList.length > 0) {
            modelString = await InputFileReader.read(fileList[0]);
            if (typeof(maxFileSizeBytes) === "number" && modelString.length > maxFileSizeBytes) {
                ErrorModals.showFileSizeError(modelString.length, maxFileSizeBytes);
                const nativeInput = fileInput.nativeInputRef?.nativeElement as HTMLInputElement;
                nativeInput.value = "";
                nativeInput.dispatchEvent(new Event("change"))
                modelString = "";
            }
        }
        return modelString;
    }
    
}
