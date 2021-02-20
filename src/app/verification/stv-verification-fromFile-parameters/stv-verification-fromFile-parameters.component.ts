import { Component, OnInit } from "@angular/core";
import { InputFileReader } from "src/app/utils";
import * as state from "../../state";

@Component({
    selector: "stv-verification-from-file-parameters",
    templateUrl: "./stv-verification-fromFile-parameters.component.html",
    styleUrls: ["./stv-verification-fromFile-parameters.component.less"],
})
export class StvVerificationFromFileParametersComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.getVerificationState().model = new state.models.File();
    }

    ngOnInit(): void {}
    
    async onFileListChanged(fileList: FileList): Promise<void> {
        let modelString = "";
        if (fileList.length > 0) {
            modelString = await InputFileReader.read(fileList[0]);
        }
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
