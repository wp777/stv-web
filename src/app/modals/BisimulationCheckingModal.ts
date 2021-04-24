import { Modal } from "./Modal";

export class BisimulationCheckingModal extends Modal {
    
    constructor(modelsAreABisimilar: boolean) {
        super(
            "Bisimulation checking result",
            `
                <div>
                    Models are ${modelsAreABisimilar ? "" : "not "}A-bisimilar.
                </div>
            `,
        );
    }
    
}
