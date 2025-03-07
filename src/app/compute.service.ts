import * as Types from "stv-types";
import { Injectable } from "@angular/core";
import * as state from "./state";
import { ErrorModals } from "./modals/ErrorModals";
import { saveAs } from "file-saver";

interface SuccessResponse {
    status: "success";
    data: string;
}

interface ErrorResponse {
    status: "error";
    error: string;
}

type Response = SuccessResponse | ErrorResponse;

type RawApproximationResult = ["0" | "1", number, string];

type RawDominoDfsResult = ["0" | "1", string];

type RawNaturalStrategyResult = ["0" | "1", string, string, string];

interface RawBisimulationCheckingResult {
    bisimulation_result: boolean;
    coalition: string[];
    mapping: Array<[number[], number[]]>;
    model1: string;
    model2: string;
}

export interface ApproximationDoesNotHaveToHoldResult {
    type: "approximationDoesNotHaveToHold";
    numStatesWhereFormulaHolds: number;
    strategyObjectiveString: string;
}

export interface ApproximationDoesNotHoldResult {
    type: "approximationDoesNotHold";
    numStatesWhereFormulaMightHold: number;
    strategyObjectiveString: string;
}

export interface ApproximationHoldsResult {
    type: "approximationHolds";
    numStatesWhereFormulaHolds: number;
    strategyObjectiveString: string;
    strategyObjectiveModel: state.models.graph.Graph;
}

export interface ApproximationMightHoldResult {
    type: "approximationMightHold";
    numStatesWhereFormulaMightHold: number;
    strategyObjectiveString: string;
    strategyObjectiveModel: state.models.graph.Graph;
}

export type ApproximationResult = ApproximationDoesNotHaveToHoldResult | ApproximationDoesNotHoldResult | ApproximationHoldsResult | ApproximationMightHoldResult;

export interface DominoDfsResult {
    strategyFound: boolean;
    strategyObjectiveString: string;
    strategyObjectiveModel: state.models.graph.Graph;
}

export interface BisimulationCheckingResult {
    modelsAreABisimilar: boolean;
    coalition: string[];
}

export interface NaturalStrategyResult {
    strategyFound: boolean;
    strategy: string;
    strategyObjectiveString: string;
    strategyObjectiveModel: state.models.graph.Graph;
    naturalStrategy: string;
    complexity: string;
}

@Injectable({
    providedIn: "root",
})
export class ComputeService {
    
    constructor() {}

    async generateAssumption(model: state.models.File): Promise<void> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.AssumptionModelGeneration = {
            type: "assumptionModelGeneration",
            modelParameters: modelParameters,
        };
        const result = await this.requestCompute<Types.actions.AssumptionModelGeneration, any>(action);
        if (result.specs) {
            for(let i = 0; i< result.specs.length - 1; i++) {
                saveAs(new File([result["specs"][i]], result.localModelNames[i] + ".txt", {type: "text/plain;charset=utf-8"}));
            }

            saveAs(new File([result["specs"][result.specs.length - 1]], "Global Model.txt", {type: "text/plain;charset=utf-8"}));
        }

        if (result.localModels) {
            model.localModels = result.localModels.map((localModelStr: string) => JSON.parse(localModelStr));
        }

        if (result.localModelNames) {
            model.localModelNames = result.localModelNames;
        }

        if (result.globalModel) {
            model.globalModel = JSON.parse(result.globalModel);
        }

        if(result.formulas) {
            model.formulas = result.formulas;
        }
    }

    async generateModel(model: state.models.SomeModel, reduced: boolean): Promise<void> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.ModelGeneration = {
            type: "modelGeneration",
            modelParameters: modelParameters,
            reduced: reduced,
        };
        const result = await this.requestCompute<Types.actions.ModelGeneration, any>(action);
        if (result.nodes && result.links) {
            model.globalModel = result;
        }
        else {
            if (result.formula) {
                model.formula = result.formula;
            }
            if (result.globalModel && !reduced) {
                model.globalModel = JSON.parse(result.globalModel);
            }
            if (result.reducedModel) {
                model.reducedModel = JSON.parse(result.reducedModel);
            }
            if (result.localModels) {
                model.localModels = result.localModels.map((localModelStr: string) => JSON.parse(localModelStr));
            }
            if (result.localModelNames) {
                model.localModelNames = result.localModelNames;
            }
        }
    }
    
    async generateOnTheFlyModel(model: state.models.File): Promise<void> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.OnTheFlyModelGeneration = {
            type: "onTheFlyModelGeneration",
            modelParameters: modelParameters,
        };
        const result = await this.requestCompute<Types.actions.OnTheFlyModelGeneration, any>(action);
        if (result.nodes && result.links) {
            model.globalModel = result;
        }
        else {
            if (result.formula) {
                model.formula = result.formula;
            }
            if (result.globalModel) {
                model.globalModel = JSON.parse(result.globalModel);
            }
            if (result.localModels) {
                model.localModels = result.localModels.map((localModelStr: string) => JSON.parse(localModelStr));
            }
            if (result.localModelNames) {
                model.localModelNames = result.localModelNames;
            }
        }
    }

    async verifyAssumptionUsingLowerApproximation(model: state.models.SomeModel, modelName: string): Promise<ApproximationResult> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.LowerApproximationAssumption = {
            type: "lowerApproximationAssumption",
            modelParameters: modelParameters,
            modelName: modelName,
        };
        const rawResult = await this.requestCompute<Types.actions.LowerApproximationAssumption, RawApproximationResult>(action);
        if (rawResult[0] === "1") {
            return <ApproximationHoldsResult>{
                type: "approximationHolds",
                numStatesWhereFormulaHolds: rawResult[1],
                strategyObjectiveString: rawResult[2],
                strategyObjectiveModel: JSON.parse(rawResult[2]),
            };
        }
        else if (rawResult[0] === "0") {
            return <ApproximationDoesNotHaveToHoldResult>{
                type: "approximationDoesNotHaveToHold",
                numStatesWhereFormulaHolds: rawResult[1],
                strategyObjectiveString: rawResult[2],
            };
        }
        else {
            throw new Error("Unexpected approximation result");
        }
    }

    async verifyAssumptionUsingUpperApproximation(model: state.models.SomeModel, modelName: string): Promise<ApproximationResult> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.UpperApproximationAssumption = {
            type: "upperApproximationAssumption",
            modelParameters: modelParameters,
            modelName: modelName,
        };
        const rawResult = await this.requestCompute<Types.actions.UpperApproximationAssumption, RawApproximationResult>(action);
        if (rawResult[0] === "1") {
            return <ApproximationMightHoldResult>{
                type: "approximationMightHold",
                numStatesWhereFormulaMightHold: rawResult[1],
                strategyObjectiveString: rawResult[2],
                strategyObjectiveModel: JSON.parse(rawResult[2]),
            };
        }
        else if (rawResult[0] === "0") {
            return <ApproximationDoesNotHoldResult>{
                type: "approximationDoesNotHold",
                numStatesWhereFormulaMightHold: rawResult[1],
                strategyObjectiveString: rawResult[2],
            };
        }
        else {
            throw new Error("Unexpected approximation result");
        }
    }
    
    async verifyModelUsingLowerApproximation(model: state.models.SomeModel, reduced: boolean): Promise<ApproximationResult> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.LowerApproximation = {
            type: "lowerApproximation",
            modelParameters: modelParameters,
            reduced: reduced,
        };
        const rawResult = await this.requestCompute<Types.actions.LowerApproximation, RawApproximationResult>(action);
        if (rawResult[0] === "1") {
            return <ApproximationHoldsResult>{
                type: "approximationHolds",
                numStatesWhereFormulaHolds: rawResult[1],
                strategyObjectiveString: rawResult[2],
                strategyObjectiveModel: JSON.parse(rawResult[2]),
            };
        }
        else if (rawResult[0] === "0") {
            return <ApproximationDoesNotHaveToHoldResult>{
                type: "approximationDoesNotHaveToHold",
                numStatesWhereFormulaHolds: rawResult[1],
                strategyObjectiveString: rawResult[2],
            };
        }
        else {
            throw new Error("Unexpected approximation result");
        }
    }
    
    async verifyModelUsingUpperApproximation(model: state.models.SomeModel, reduced: boolean): Promise<ApproximationResult> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.UpperApproximation = {
            type: "upperApproximation",
            modelParameters: modelParameters,
            reduced: reduced,
        };
        const rawResult = await this.requestCompute<Types.actions.UpperApproximation, RawApproximationResult>(action);
        if (rawResult[0] === "1") {
            return <ApproximationMightHoldResult>{
                type: "approximationMightHold",
                numStatesWhereFormulaMightHold: rawResult[1],
                strategyObjectiveString: rawResult[2],
                strategyObjectiveModel: JSON.parse(rawResult[2]),
            };
        }
        else if (rawResult[0] === "0") {
            return <ApproximationDoesNotHoldResult>{
                type: "approximationDoesNotHold",
                numStatesWhereFormulaMightHold: rawResult[1],
                strategyObjectiveString: rawResult[2],
            };
        }
        else {
            throw new Error("Unexpected approximation result");
        }
    }

    async verifyAssumptionUsingDominoDfs(model: state.models.SomeModel, modelName: string, heuristic: Types.actions.DominoDfsHeuristic): Promise<DominoDfsResult> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.DominoAssumption = {
            type: "dominoAssumption",
            modelParameters: modelParameters,
            modelName: modelName,
            heuristic: heuristic,
        };
        const rawResult = await this.requestCompute<Types.actions.DominoAssumption, RawDominoDfsResult>(action);
        return this.convertRawResultToDominoDfsResult(rawResult);
    }
    
    async verifyModelUsingDominoDfs(model: state.models.SomeModel, reduced: boolean, heuristic: Types.actions.DominoDfsHeuristic): Promise<DominoDfsResult> {
        const modelParameters: Types.models.parameters.SomeParameters = model.parameters.getPlainModelParameters();
        const action: Types.actions.DominoDfs = {
            type: "dominoDfs",
            modelParameters: modelParameters,
            reduced: reduced,
            heuristic: heuristic,
        };
        const rawResult = await this.requestCompute<Types.actions.DominoDfs, RawDominoDfsResult>(action);
        return this.convertRawResultToDominoDfsResult(rawResult);
    }

    async verifyModelUsingNaturalStrategy(model: state.models.File): Promise<NaturalStrategyResult> {
        const modelParameters: Types.models.parameters.File = model.parameters.getPlainModelParameters();
        const action: Types.actions.NaturalStrategy = {
            type: "naturalStrategy",
            modelParameters: modelParameters,
        };
        const rawResult = await this.requestCompute<Types.actions.NaturalStrategy, RawNaturalStrategyResult>(action);
        return {
            strategyFound: rawResult[0] === "1",
            strategy: rawResult[1],
            strategyObjectiveString: rawResult[1],
            strategyObjectiveModel: JSON.parse(rawResult[1]),
            naturalStrategy: this.convertRawNaturalStrategyToReadableString(rawResult[2]),
            complexity: rawResult[3],
        };
    }

    private convertRawNaturalStrategyToReadableString(rawNaturalStrategy: string): string {
        return rawNaturalStrategy
            .replace(/^\[|\]$/g, '')  // Remove square brackets from the beginning and end
            .replace(/'/g, '')        // Remove single quotes
            .replace(/, /g, '\n');     // Replace commas with new lines
    }
    
    async checkBisimulation(model1: state.models.File, model2: state.models.File, specificationModel: state.models.parameters.File): Promise<BisimulationCheckingResult> {
        const model1Parameters: Types.models.parameters.File = model1.parameters.getPlainModelParameters();
        const model2Parameters: Types.models.parameters.File = model2.parameters.getPlainModelParameters();
        const specification: Types.models.parameters.File = specificationModel.getPlainModelParameters();
        const action: Types.actions.BisimulationChecking = {
            type: "bisimulationChecking",
            model1Parameters: model1Parameters,
            model2Parameters: model2Parameters,
            specification: specification,
        };
        const rawResult = await this.requestCompute<Types.actions.BisimulationChecking, RawBisimulationCheckingResult>(action);
        return {
            modelsAreABisimilar: rawResult.bisimulation_result,
            coalition: rawResult.coalition,
        };
    }
    
    private convertRawResultToDominoDfsResult(result: RawDominoDfsResult): DominoDfsResult {
        return {
            strategyFound: result[0] === "1",
            strategyObjectiveString: result[1],
            strategyObjectiveModel: JSON.parse(result[1]),
        };
    }
    
    async requestCompute<TRequest extends Types.actions.Action, TResponse>(requestObject: TRequest): Promise<TResponse> {
        return this.requestJson("POST", "compute", requestObject);
    }
    
    async requestComputeLimitsConfig(): Promise<Types.config.Config> {
        return this.requestJson("GET", "computation-limits-config");
    }
    
    async requestJson<TRequest, TResponse>(method: "GET"| "POST", path: string, requestObject?: TRequest): Promise<TResponse> {
        const response = await fetch(
            `/${path}`,
            {
                method: method,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: requestObject ? JSON.stringify(requestObject) : undefined,
            },
        );
        const responseObject = await response.json() as Response;
        if (responseObject.status === "error") {
            ErrorModals.showForServerError(responseObject.error);
            console.error(responseObject.error);
            throw new Error("Server error");
        }
        console.log(responseObject.data);
        return JSON.parse(responseObject.data);
    }
    
}
