import { Modal } from "./Modal";

export class NaturalStrategyModal extends Modal {
    
    constructor(strategyFound: boolean, strategy: string, complexity: string) {
        super(
            "Verification result",
            `
                <div class="main-message">
                    Result: strategy <strong>${strategyFound ? "found" : "not found"}</strong>.
                </div>

                <div>
                    ${strategyFound ? `
                        <div>
                            <strong>Natural strategy:</strong>
                            <br>
                            <pre style="max-height: 80vh; overflow: scroll;">${strategy}</pre>
                            <br>
                            <strong>Complexity: ${complexity}</strong> 
                        </div>
                    ` : ""}
                </div>
            `,
        );
    }
    
}
