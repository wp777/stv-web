import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { StvFileInputComponent } from "src/app/common/stv-file-input/stv-file-input.component";
import { ConfigProvider } from "src/app/config.provider";
import { InputFileReader } from "src/app/utils";
import * as state from "../../state";

@Component({
    selector: "stv-verification-from-file-parameters",
    templateUrl: "./stv-verification-fromFile-parameters.component.html",
    styleUrls: ["./stv-verification-fromFile-parameters.component.less"],
})
export class StvVerificationFromFileParametersComponent implements OnInit {
    
    // Config
    maxModelFileSizeBytes: number | "";
    
    @ViewChild("modelFileInput")
    modelFileInputRef?: ElementRef<StvFileInputComponent>;
    
    get modelFileInput(): StvFileInputComponent {
        return this.modelFileInputRef! as unknown as StvFileInputComponent;
    }
    
    constructor(private appState: state.AppState, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.maxModelFileSizeBytes = config.fileModel.maxFileSizeBytes === ConfigProvider.UNLIMITED ? "" : config.fileModel.maxFileSizeBytes;
        
        this.getVerificationState().model = new state.models.File();
    }

    ngOnInit(): void {}
    
    async onFileListChanged(fileList: FileList): Promise<void> {
        const modelString = await InputFileReader.readWithFileSizeVerification(fileList, this.maxModelFileSizeBytes, this.modelFileInput);
        this.getVerificationModelParameters().modelString = modelString;
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.File {
        return this.getVerificationState().model as state.models.File;
    }
    
    private getVerificationModelParameters(): state.models.parameters.File {
        return this.getVerificationModel().parameters;
    }
    
}
