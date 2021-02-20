import { Component, OnInit } from "@angular/core";
import * as state from "../../state";

@Component({
    selector: "stv-verification-castles-parameters",
    templateUrl: "./stv-verification-castles-parameters.component.html",
    styleUrls: ["./stv-verification-castles-parameters.component.less"],
})
export class StvVerificationCastlesParametersComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.getVerificationState().model = new state.models.Castles();
    }

    ngOnInit(): void {}
    
    onCastle1SizeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().castle1Size = parseInt(input.value);
    }
    
    onCastle2SizeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().castle2Size = parseInt(input.value);
    }
    
    onCastle3SizeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.getVerificationModelParameters().castle3Size = parseInt(input.value);
    }
    
    onLifeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
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
