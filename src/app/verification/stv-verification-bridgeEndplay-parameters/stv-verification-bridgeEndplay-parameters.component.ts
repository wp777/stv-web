import { Component, OnInit } from "@angular/core";
import { ConfigProvider } from "src/app/config.provider";
import { NumberInput } from "src/app/utils/NumberInput";
import * as state from "../../state";

@Component({
    selector: "stv-verification-bridge-endplay-parameters",
    templateUrl: "./stv-verification-bridgeEndplay-parameters.component.html",
    styleUrls: ["./stv-verification-bridgeEndplay-parameters.component.less"],
})
export class StvVerificationBridgeEndplayParametersComponent implements OnInit {
    
    
    // Config
    minCardsInHand: number | "";
    maxCardsInHand: number | "";
    minDeckSize: number | "";
    maxDeckSize: number | "";
    
    constructor(private appState: state.AppState, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.minCardsInHand = config.parameterizedModels.bridgeEndplay.min.cardsInHand === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.bridgeEndplay.min.cardsInHand;
        this.maxCardsInHand = config.parameterizedModels.bridgeEndplay.max.cardsInHand === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.bridgeEndplay.max.cardsInHand;
        this.minDeckSize = config.parameterizedModels.bridgeEndplay.min.deckSize === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.bridgeEndplay.min.deckSize;
        this.maxDeckSize = config.parameterizedModels.bridgeEndplay.max.deckSize === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.bridgeEndplay.max.deckSize;
        
        this.getVerificationState().model = new state.models.BridgeEndplay();
    }

    ngOnInit(): void {}
    
    onCardsInHandInput(event: Event): void {
        this.refreshCardsInHandFromInput(event.target as HTMLInputElement);
    }
    
    onCardsInHandBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshCardsInHandFromInput(event.target as HTMLInputElement);
    }
    
    refreshCardsInHandFromInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().cardsInHand = parseInt(input.value);
    }
    
    onDeckSizeInput(event: Event): void {
        this.refreshDeckSizeFromInput(event.target as HTMLInputElement);
    }
    
    onDeckSizeBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshDeckSizeFromInput(event.target as HTMLInputElement);
    }
    
    refreshDeckSizeFromInput(input: HTMLInputElement) {
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
