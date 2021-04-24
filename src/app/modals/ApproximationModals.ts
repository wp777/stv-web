import { ApproximationResult } from "../compute.service";
import { ApproximationDoesNotHaveToHoldModal } from "./ApproximationDoesNotHaveToHoldModal";
import { ApproximationDoesNotHoldModal } from "./ApproximationDoesNotHoldModal";
import { ApproximationHoldsModal } from "./ApproximationHoldsModal";
import { ApproximationMightHoldModal } from "./ApproximationMightHoldModal";

export class ApproximationModals {
    
    static showForResult(result: ApproximationResult): void {
        if (result.type === "approximationDoesNotHaveToHold") {
            new ApproximationDoesNotHaveToHoldModal(result.numStatesWhereFormulaHolds).show();
        }
        else if (result.type === "approximationDoesNotHold") {
            new ApproximationDoesNotHoldModal(result.numStatesWhereFormulaMightHold).show();
        }
        else if (result.type === "approximationHolds") {
            new ApproximationHoldsModal(result.numStatesWhereFormulaHolds).show();
        }
        else if (result.type === "approximationMightHold") {
            new ApproximationMightHoldModal(result.numStatesWhereFormulaMightHold).show();
        }
    }
    
}
