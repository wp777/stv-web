import * as Types from "stv-types";
import { Injectable } from "@angular/core";
import { ComputeService } from "./compute.service";

@Injectable()
export class ConfigProvider {
    
    static readonly UNLIMITED: number = -1;
    
    private static _instance: ConfigProvider;
    static get instance(): ConfigProvider {
        return this._instance;
    }
    
    private config: Types.config.Config | null = null;

    constructor(private computeService: ComputeService) {
        ConfigProvider._instance = this;
    }

    public getConfig(): Types.config.Config {
        return this.config!;
    }

    async load(): Promise<void> {
        this.config = await this.computeService.requestComputeLimitsConfig();
    }
    
}

export function configProviderFactory(provider: ConfigProvider) {
    return () => provider.load();
}
