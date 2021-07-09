import { Modal } from "./Modal";

export class ApproximationMightHoldModal extends Modal {
    
    constructor(numStatesWhereFormulaMightHold: number) {
        super(
            "Verification result",
            `
                <div>
                    The formula <strong>might hold</strong> in the model.<br />
                    Number of states where the formula might hold: <strong>${numStatesWhereFormulaMightHold}</strong>.
                </div>
            `,
        );
    }
    
}
