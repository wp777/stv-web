import { Component, OnInit } from "@angular/core";
import * as state from "../../state";

@Component({
    selector: "stv-verification-drones-parameters",
    templateUrl: "./stv-verification-drones-parameters.component.html",
    styleUrls: ["./stv-verification-drones-parameters.component.less"],
})
export class StvVerificationDronesParametersComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.getVerificationState().model = new state.models.Drones();
    }

    ngOnInit(): void {}
    
    onInitialEnergyInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().initialEnergy = parseInt(input.value);
    }
    
    onNumberOfDronesInput(event: Event): void {
        const input = event.target as HTMLInputElement;
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
