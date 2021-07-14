import { Component, OnInit } from "@angular/core";
import { ConfigProvider } from "src/app/config.provider";
import { NumberInput } from "src/app/utils/NumberInput";
import * as state from "../../state";

@Component({
    selector: "stv-verification-simple-voting-parameters",
    templateUrl: "./stv-verification-simpleVoting-parameters.component.html",
    styleUrls: ["./stv-verification-simpleVoting-parameters.component.less"],
})
export class StvVerificationSimpleVotingParametersComponent implements OnInit {
    
    // Config
    minCandidates: number | "";
    maxCandidates: number | "";
    minVoters: number | "";
    maxVoters: number | "";
    
    constructor(private appState: state.AppState, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.minCandidates = config.parameterizedModels.simpleVoting.min.candidates === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.simpleVoting.min.candidates;
        this.maxCandidates = config.parameterizedModels.simpleVoting.max.candidates === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.simpleVoting.max.candidates;
        this.minVoters = config.parameterizedModels.simpleVoting.min.voters === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.simpleVoting.min.voters;
        this.maxVoters = config.parameterizedModels.simpleVoting.max.voters === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.simpleVoting.max.voters;
        
        this.getVerificationState().model = new state.models.SimpleVoting();
    }

    ngOnInit(): void {}
    
    onCandidatesInput(event: Event): void {
        this.refreshCandidatesFromInput(event.target as HTMLInputElement);
    }
    
    onCandidatesBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshCandidatesFromInput(event.target as HTMLInputElement);
    }
    
    refreshCandidatesFromInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().candidates = parseInt(input.value);
    }
    
    onVotersInput(event: Event): void {
        this.refreshVotersFromInput(event.target as HTMLInputElement);
    }
    
    onVotersBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshVotersFromInput(event.target as HTMLInputElement);
    }
    
    refreshVotersFromInput(input: HTMLInputElement) {
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
