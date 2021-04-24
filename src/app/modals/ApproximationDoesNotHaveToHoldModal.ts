import { Modal } from "./Modal";

export class ApproximationDoesNotHaveToHoldModal extends Modal {
    
    constructor(numStatesWhereFormulaHolds: number) {
        super(
            "Verification result",
            `
                <div>
                    The formula <strong>does not have to hold</strong> in the model.<br />
                    Number of states where the formula holds: <strong>${numStatesWhereFormulaHolds}</strong>.
                </div>
            `,
        );
    }
    
}
