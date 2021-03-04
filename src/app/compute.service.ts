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
    
    async generateModel<TModel>(modelParameters: Types.models.parameters.SomeParameters, reduced: boolean): Promise<TModel> {
        const action: Types.actions.ModelGeneration = {
            type: "modelGeneration",
            modelParameters: modelParameters,
            reduced: reduced,
        };
        return this.requestCompute(action);
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
