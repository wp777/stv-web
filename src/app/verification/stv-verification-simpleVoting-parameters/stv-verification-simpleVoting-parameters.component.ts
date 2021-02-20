import { Component, OnInit } from "@angular/core";
import * as state from "../../state";

@Component({
    selector: "stv-verification-simple-voting-parameters",
    templateUrl: "./stv-verification-simpleVoting-parameters.component.html",
    styleUrls: ["./stv-verification-simpleVoting-parameters.component.less"],
})
export class StvVerificationSimpleVotingParametersComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.getVerificationState().model = new state.models.SimpleVoting();
    }

    ngOnInit(): void {}
    
    onCandidatesInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().candidates = parseInt(input.value);
    }
    
    onVotersInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().voters = parseInt(input.value);
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.SimpleVoting {
        return this.getVerificationState().model as state.models.SimpleVoting;
    }
    
    private getVerificationModelParameters(): state.models.parameters.SimpleVoting {
        return this.getVerificationModel().parameters;
    }
    
}
