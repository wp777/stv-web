import { Component, OnInit } from "@angular/core";
import { ConfigProvider } from "src/app/config.provider";
import { NumberInput } from "src/app/utils/NumberInput";
import * as state from "../../state";

@Component({
    selector: "stv-verification-castles-parameters",
    templateUrl: "./stv-verification-castles-parameters.component.html",
    styleUrls: ["./stv-verification-castles-parameters.component.less"],
})
export class StvVerificationCastlesParametersComponent implements OnInit {
    
    
    // Config
    minCastle1Size: number | "";
    maxCastle1Size: number | "";
    minCastle2Size: number | "";
    maxCastle2Size: number | "";
    minCastle3Size: number | "";
    maxCastle3Size: number | "";
    minLife: number | "";
    maxLife: number | "";
    
    constructor(private appState: state.AppState, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.minCastle1Size = config.parameterizedModels.castles.min.castle1Size === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.min.castle1Size;
        this.maxCastle1Size = config.parameterizedModels.castles.max.castle1Size === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.max.castle1Size;
        this.minCastle2Size = config.parameterizedModels.castles.min.castle2Size === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.min.castle2Size;
        this.maxCastle2Size = config.parameterizedModels.castles.max.castle2Size === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.max.castle2Size;
        this.minCastle3Size = config.parameterizedModels.castles.min.castle3Size === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.min.castle3Size;
        this.maxCastle3Size = config.parameterizedModels.castles.max.castle3Size === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.max.castle3Size;
        this.minLife = config.parameterizedModels.castles.min.life === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.min.life;
        this.maxLife = config.parameterizedModels.castles.max.life === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.castles.max.life;
        
        this.getVerificationState().model = new state.models.Castles();
    }

    ngOnInit(): void {}
    
    onCastle1SizeInput(event: Event): void {
        this.refreshCastle1SizeFromInput(event.target as HTMLInputElement);
    }
    
    onCastle1SizeBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshCastle1SizeFromInput(event.target as HTMLInputElement);
    }
    
    refreshCastle1SizeFromInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().castle1Size = parseInt(input.value);
    }
    
    onCastle2SizeInput(event: Event): void {
        this.refreshCastle2SizeFromInput(event.target as HTMLInputElement);
    }
    
    onCastle2SizeBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshCastle2SizeFromInput(event.target as HTMLInputElement);
    }
    
    refreshCastle2SizeFromInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().castle2Size = parseInt(input.value);
    }
    
    onCastle3SizeInput(event: Event): void {
        this.refreshCastle3SizeFromInput(event.target as HTMLInputElement);
    }
    
    onCastle3SizeBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshCastle3SizeFromInput(event.target as HTMLInputElement);
    }
    
    refreshCastle3SizeFromInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().castle3Size = parseInt(input.value);
    }
    
    onLifeInput(event: Event): void {
        this.refreshLifeFromInput(event.target as HTMLInputElement);
    }
    
    onLifeBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshLifeFromInput(event.target as HTMLInputElement);
    }
    
    refreshLifeFromInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().life = parseInt(input.value);
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.Castles {
        return this.getVerificationState().model as state.models.Castles;
    }
    
    private getVerificationModelParameters(): state.models.parameters.Castles {
        return this.getVerificationModel().parameters;
    }
    
}
