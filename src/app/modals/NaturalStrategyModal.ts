import { Modal } from "./Modal";

export class NaturalStrategyModal extends Modal {
    
    constructor(strategyFound: boolean, strategy: string) {
        super(
            "Verification result",
            `
                <div class="main-message">
                    Result strategy <strong>${strategyFound ? "found" : "not found"}</strong>.
                </div>

                <div>
                    ${strategyFound ? `
                        <div>
                            <strong>Strategy:</strong>
                            <pre>${strategy}</pre>
                        </div>
                    ` : ""}
                </div>
            `,
        );
    }
    
}
