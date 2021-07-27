import { Modal } from "./Modal";

export class DominoDfsResultModal extends Modal {
    
    constructor(strategyFound: boolean) {
        super(
            "Verification result",
            `
                <div class="main-message">
                    Result strategy <strong>${strategyFound ? "found" : "not found"}</strong>.
                </div>
            `,
        );
    }
    
}
