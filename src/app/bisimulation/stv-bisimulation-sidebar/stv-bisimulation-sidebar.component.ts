import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import { ComputeService } from "src/app/compute.service";
import * as state from "src/app/state";
import { InputFileReader } from "src/app/utils";

@Component({
    selector: "stv-bisimulation-sidebar",
    templateUrl: "./stv-bisimulation-sidebar.component.html",
    styleUrls: ["./stv-bisimulation-sidebar.component.less"],
})
export class StvBisimulationSidebarComponent implements OnInit, OnDestroy {
    
    _canGenerate: boolean = false;
    get canGenerate(): boolean { return this._canGenerate; }
    set canGenerate(canGenerate: boolean) { this._canGenerate = canGenerate; }
    
    _canCheck: boolean = false;
    get canCheck(): boolean { return this._canCheck; }
    set canCheck(canCheck: boolean) { this._canCheck = canCheck; }
    
    _canVerifyLeft: boolean = false;
    get canVerifyLeft(): boolean { return this._canVerifyLeft; }
    set canVerifyLeft(canVerifyLeft: boolean) { this._canVerifyLeft = canVerifyLeft; }
    
    _canVerifyRight: boolean = false;
    get canVerifyRight(): boolean { return this._canVerifyRight; }
    set canVerifyRight(canVerifyRight: boolean) { this._canVerifyRight = canVerifyRight; }
    
    coalitionA: string | null = null;
    
    appStateSubscription: Subscription;
    
    constructor(private appState: state.AppState, private computeService: ComputeService) {
        this.appState.action = new state.actions.Bisimulation();
        this.appStateSubscription = appState.state$
            .pipe(debounce(() => interval(10)))
            .subscribe(() => this.onAppStateChanged());
    }

    ngOnInit(): void {}
    
    ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
    }
    
    onAppStateChanged(): void {
        this.canGenerate = this.getBisimulationState().canGenerateModel();
        this.canCheck = this.getBisimulationState().canCheckBisimulation();
        this.canVerifyLeft = this.getBisimulationState().canVerifyModel1();
        this.canVerifyRight = this.getBisimulationState().canVerifyModel2();
        this.coalitionA = null; // @todo WP
    }
    
    async onModel1FileListChanged(fileList: FileList): Promise<void> {
        let modelString = "";
        if (fileList.length > 0) {
            modelString = await InputFileReader.read(fileList[0]);
        }
        this.getBisimulationModel1Parameters().modelString = modelString;
    }
    
    async onModel2FileListChanged(fileList: FileList): Promise<void> {
        let modelString = "";
        if (fileList.length > 0) {
            modelString = await InputFileReader.read(fileList[0]);
        }
        this.getBisimulationModel2Parameters().modelString = modelString;
    }
    
    async onBisimulationSpecificationFileListChanged(fileList: FileList): Promise<void> {
        let modelString = "";
        if (fileList.length > 0) {
            modelString = await InputFileReader.read(fileList[0]);
        }
        this.getBisimulationSpecificationParameters().modelString = modelString;
    }
    
    async onGenerateClick(): Promise<void> {
        await this.generateModel(this.getBisimulationModel1(), false);
        await this.generateModel(this.getBisimulationModel2(), false);
    }
    
    onCheckClick(): void {
        // @todo WP check bisimulation
        console.log(this.appState);
    }
    
    async onVerifyLeftClick(): Promise<void> {
        // @todo WP goto Verification/FromFile
        console.log(this.appState);
    }
    
    async onVerifyRightClick(): Promise<void> {
        // @todo WP goto Verification/FromFile
        console.log(this.appState);
    }
    
    async generateModel(model: state.models.File, reduced: boolean): Promise<void> {
        await this.computeService.generateModel(model, reduced);
    }
    
    private getBisimulationState(): state.actions.Bisimulation {
        return this.appState.action as state.actions.Bisimulation;
    }
    
    private getBisimulationModel1(): state.models.File {
        return this.getBisimulationState().model1 as state.models.File;
    }
    
    private getBisimulationModel2(): state.models.File {
        return this.getBisimulationState().model2 as state.models.File;
    }
    
    private getBisimulationModel1Parameters(): state.models.parameters.File {
        return this.getBisimulationModel1().parameters;
    }
    
    private getBisimulationModel2Parameters(): state.models.parameters.File {
        return this.getBisimulationModel2().parameters;
    }
    
    private getBisimulationSpecificationParameters(): state.models.parameters.File {
        return this.getBisimulationState().specification as state.models.parameters.File;
    }
    
}
