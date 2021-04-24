import { DominoDfsResult } from "../compute.service";
import { DominoDfsResultModal } from "./DominoDfsResultModal";

export class DominoDfsModals {
    
    static showForResult(result: DominoDfsResult): void {
        new DominoDfsResultModal(result.strategyFound).show();
    }
    
}
