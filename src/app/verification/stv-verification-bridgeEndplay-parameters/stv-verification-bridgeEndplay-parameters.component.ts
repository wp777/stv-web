import { Component, OnInit } from "@angular/core";
import * as state from "../../state";

@Component({
    selector: "stv-verification-bridge-endplay-parameters",
    templateUrl: "./stv-verification-bridgeEndplay-parameters.component.html",
    styleUrls: ["./stv-verification-bridgeEndplay-parameters.component.less"],
})
export class StvVerificationBridgeEndplayParametersComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.getVerificationState().model = new state.models.BridgeEndplay();
    }

    ngOnInit(): void {}
    
    onCardsInHandInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().cardsInHand = parseInt(input.value);
    }
    
    onDeckSizeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().deckSize = parseInt(input.value);
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.BridgeEndplay {
        return this.getVerificationState().model as state.models.BridgeEndplay;
    }
    
    private getVerificationModelParameters(): state.models.parameters.BridgeEndplay {
        return this.getVerificationModel().parameters;
    }
    
}
