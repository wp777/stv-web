import { Modal } from "./Modal";

export class DominoDfsResultModal extends Modal {
    
    constructor(strategyFound: boolean) {
        super(
            "Verification result",
            `
                <div>
                    Result strategy <strong>${strategyFound ? "found" : "not found"}</strong>.
                </div>
            `,
        );
    }
    
}
