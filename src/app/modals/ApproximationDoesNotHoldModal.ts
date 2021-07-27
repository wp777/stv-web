import { Modal } from "./Modal";

export class ApproximationDoesNotHoldModal extends Modal {
    
    constructor(numStatesWhereFormulaMightHold: number) {
        super(
            "Verification result",
            `
                <div class="main-message">
                    The formula <strong>does not hold</strong> in the model.<br />
                    Number of states where the formula might hold: <strong>${numStatesWhereFormulaMightHold}</strong>.
                </div>
            `,
        );
    }
    
}
