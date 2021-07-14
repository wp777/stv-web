import { Modal } from "./Modal";

export class ApproximationHoldsModal extends Modal {
    
    constructor(numStatesWhereFormulaHolds: number) {
        super(
            "Verification result",
            `
                <div class="main-message">
                    The formula <strong>holds</strong> in the model.<br />
                    Number of states where the formula holds: <strong>${numStatesWhereFormulaHolds}</strong>.
                </div>
            `,
        );
    }
    
}
