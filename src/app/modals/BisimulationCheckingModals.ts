import { BisimulationCheckingResult } from "../compute.service";
import { BisimulationCheckingModal } from "./BisimulationCheckingModal";

export class BisimulationCheckingModals {
    
    static showForResult(result: BisimulationCheckingResult): void {
        new BisimulationCheckingModal(result.modelsAreABisimilar).show();
    }
    
}
