import { Component, OnInit } from "@angular/core";
import * as state from "../../state";

@Component({
    selector: "stv-verification-tian-ji-parameters",
    templateUrl: "./stv-verification-tianJi-parameters.component.html",
    styleUrls: ["./stv-verification-tianJi-parameters.component.less"],
})
export class StvVerificationTianJiParametersComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.getVerificationState().model = new state.models.TianJi();
    }

    ngOnInit(): void {}
    
    onHorsesInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().horses = parseInt(input.value);
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.TianJi {
        return this.getVerificationState().model as state.models.TianJi;
    }
    
    private getVerificationModelParameters(): state.models.parameters.TianJi {
        return this.getVerificationModel().parameters;
    }
    
}
