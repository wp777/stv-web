import { NaturalStrategyResult } from "../compute.service";
import { NaturalStrategyModal } from "./NaturalStrategyModal";

export class NaturalStrategyModals {
    
    static showForResult(result: NaturalStrategyResult): void {
        new NaturalStrategyModal(result.strategyFound, result.naturalStrategy).show();
    }
    
}
