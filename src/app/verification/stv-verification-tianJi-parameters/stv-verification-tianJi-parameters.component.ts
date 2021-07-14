import { Component, OnInit } from "@angular/core";
import { ConfigProvider } from "src/app/config.provider";
import * as state from "../../state";
import { NumberInput } from "src/app/utils/NumberInput";

@Component({
    selector: "stv-verification-tian-ji-parameters",
    templateUrl: "./stv-verification-tianJi-parameters.component.html",
    styleUrls: ["./stv-verification-tianJi-parameters.component.less"],
})
export class StvVerificationTianJiParametersComponent implements OnInit {
    
    // Config
    minHorses: number | "";
    maxHorses: number | "";
    
    constructor(private appState: state.AppState, private configProvider: ConfigProvider) {
        const config = this.configProvider.getConfig();
        this.minHorses = config.parameterizedModels.tianJi.min.horses === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.tianJi.min.horses;
        this.maxHorses = config.parameterizedModels.tianJi.max.horses === ConfigProvider.UNLIMITED ? "" : config.parameterizedModels.tianJi.max.horses;
        
        this.getVerificationState().model = new state.models.TianJi();
    }

    ngOnInit(): void {}
    
    onHorsesInput(event: Event): void {
        this.refreshHorsesFromInput(event.target as HTMLInputElement);
    }
    
    onHorsesBlur(event: Event): void {
        NumberInput.fixIntValueFromMinMax(event.target as HTMLInputElement);
        this.refreshHorsesFromInput(event.target as HTMLInputElement);
    }
    
    refreshHorsesFromInput(input: HTMLInputElement) {
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
