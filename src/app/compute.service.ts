import * as Types from "stv-types";
import { Injectable } from "@angular/core";
import * as state from "./state";

interface SuccessResponse {
    status: "success";
    data: string;
}

interface ErrorResponse {
    status: "error";
    error: any;
}

type Response = SuccessResponse | ErrorResponse;

@Injectable({
    providedIn: "root",
})
export class ComputeService {
    
    constructor() {}
    
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
    
    async requestCompute<TRequest extends Types.actions.Action, TResponse>(requestObject: TRequest): Promise<TResponse> {
        return this.requestJson("compute", requestObject);
    }
    
    async requestJson<TRequest, TResponse>(path: string, requestObject: TRequest): Promise<TResponse> {
        const response = await fetch(
            `/${path}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestObject),
            },
        );
        const responseObject = await response.json() as Response;
        if (responseObject.status === "error") {
            throw new Error("Server error");
        }
        return JSON.parse(responseObject.data);
    }
    
}
