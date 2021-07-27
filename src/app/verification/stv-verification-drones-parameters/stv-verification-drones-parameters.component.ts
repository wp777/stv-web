import { Component, OnInit } from "@angular/core";
import { ConfigProvider } from "src/app/config.provider";
import { NumberInput } from "src/app/utils/NumberInput";
import * as state from "../../state";

@Component({
    selector: "stv-verification-drones-parameters",
    templateUrl: "./stv-verification-drones-parameters.component.html",
    styleUrls: ["./stv-verification-drones-parameters.component.less"],
})
export class StvVerificationDronesParametersComponent implements OnInit {
    
    // Config
    minInitialEnergy: number | "";
    maxInitialEnergy: number | "";
    minNumberOfDrones: number | "";
    maxNumberOfDrones: number | "";
    
    constructor(private appState: state.AppState, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.minInitialEnergy = config.parameterizedModels.drones.min.initialEnergy === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.drones.min.initialEnergy;
        this.maxInitialEnergy = config.parameterizedModels.drones.max.initialEnergy === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.drones.max.initialEnergy;
        this.minNumberOfDrones = config.parameterizedModels.drones.min.numberOfDrones === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.drones.min.numberOfDrones;
        this.maxNumberOfDrones = config.parameterizedModels.drones.max.numberOfDrones === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.drones.max.numberOfDrones;
        
        this.getVerificationState().model = new state.models.Drones();
    }

    ngOnInit(): void {}
    
    onInitialEnergyInput(event: Event): void {
        this.refreshInitialEnergyInput(event.target as HTMLInputElement);
    }
    
    onInitialEnergyBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshInitialEnergyInput(event.target as HTMLInputElement);
    }
    
    refreshInitialEnergyInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().initialEnergy = parseInt(input.value);
    }
    
    onNumberOfDronesInput(event: Event): void {
        this.refreshNumberOfDronesInput(event.target as HTMLInputElement);
    }
    
    onNumberOfDronesBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshNumberOfDronesInput(event.target as HTMLInputElement);
    }
    
    refreshNumberOfDronesInput(input: HTMLInputElement) {
        this.getVerificationModelParameters().numberOfDrones = parseInt(input.value);
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.Drones {
        return this.getVerificationState().model as state.models.Drones;
    }
    
    private getVerificationModelParameters(): state.models.parameters.Drones {
        return this.getVerificationModel().parameters;
    }
    
}
