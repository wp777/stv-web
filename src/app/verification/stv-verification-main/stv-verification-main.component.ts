import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import * as state from "src/app/state";
import * as cytoscape from "cytoscape";
import { StvTabsComponent } from "src/app/common/stv-tabs/stv-tabs.component";

@Component({
    selector: "stv-verification-main",
    templateUrl: "./stv-verification-main.component.html",
    styleUrls: ["./stv-verification-main.component.less"],
})
export class StvVerificationMainComponent implements OnInit, OnDestroy, AfterViewInit {
    
    @ViewChild("tabs")
    tabs?: ElementRef<StvTabsComponent>;
    
    private viewSettingsSubscriptions: Subscription[] = [];
    
    constructor(private appState: state.AppState) {
        const viewSettings = appState.viewSettings;
        this.viewSettingsSubscriptions.push(appState.state$.pipe(debounce(() => interval(10))).subscribe(() => this.onAppStateChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.graphZoom$.subscribe(() => this.onGraphZoomChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.showActions$.subscribe(() => this.onShowActionsChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.showStateLabels$.subscribe(() => this.onShowStateChanged()));
    }

    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
        this.setTabs([]);
    }
    
    ngOnDestroy(): void {
        for (let subscription of this.viewSettingsSubscriptions) {
            subscription.unsubscribe();
        }
    }
    
    onAppStateChanged(): void {
        const model = this.getVerificationModel();
        const hasModelToRender = model.globalModel !== null;
        if (!hasModelToRender) {
            this.setTabs([]);
            return;
        }
        else {
            const hasGlobalModel = model.globalModel !== null;
            const hasReducedModel = model.reducedModel !== null;
            const localModelNames = model.localModelNames || [];
            this.setTabs([
                ...(hasGlobalModel ? [{ header: "Model", id: "global" }] : []),
                ...(hasReducedModel ? [{ header: "Reduced", id: "reduced" }] : []),
                ...localModelNames.map((localModelName, index) => ( { header: localModelName, id: `local-${index}` })),
            ]);
        }
    }
    
    onGraphZoomChanged(): void {
        // @todo
        console.log("onGraphZoomChanged", this.appState.viewSettings.graphZoom);
    }
    
    onShowActionsChanged(): void {
        // @todo
        console.log("onShowActionsChanged", this.appState.viewSettings.showActions);
    }
    
    onShowStateChanged(): void {
        // @todo
        console.log("onShowStateChanged", this.appState.viewSettings.showStateLabels);
    }
    
    onTabActivated(event: { tabHeader: HTMLElement, tabContent: HTMLElement }): void {
        const tabId = event.tabHeader.dataset["tabId"];
        const model = this.getVerificationModel();
        if (event.tabContent.classList.contains("not-rendered") && model) {
            let graph: state.models.graph.Graph | null = null;
            if (tabId === "global") {
                graph = model.globalModel;
            }
            else if (tabId === "reduced") {
                graph = model.reducedModel;
            }
            else if (tabId?.startsWith("local-")) {
                const localModelIndex =  parseInt(tabId.substr("local-".length));
                graph = model.localModels ? model.localModels[localModelIndex] : null;
            }
            if (graph) {
                this.renderGraph(graph, event.tabContent);
            }
        }
    }
    
    renderGraph(graph: state.models.graph.Graph, graphContainer: HTMLElement): void {
        graphContainer.classList.remove("not-rendered");
        // @todo render ${graph} in ${graphContainer}
        console.log(graph, graphContainer);
        const cy = cytoscape({
            container: graphContainer,
            elements: [
                { data: { id: "a" } },
                { data: { id: "b" } },
                { data: { id: "c" } },
                { data: { id: "d" } },
                { data: { id: "e" } },
                { data: { id: "f" } },
                // edges
                {
                    data: {
                        id: "ab",
                        source: "a",
                        target: "b",
                    },
                },
                {
                    data: {
                        id: "cd",
                        source: "c",
                        target: "d",
                    },
                },
                {
                    data: {
                        id: "ef",
                        source: "e",
                        target: "f",
                    },
                },
                {
                    data: {
                        id: "ac",
                        source: "a",
                        target: "c",
                    },
                },
                {
                    data: {
                        id: "be",
                        source: "b",
                        target: "e",
                    },
                },
            ],
        });
    }
    
    setTabs(tabs: { header: string, id: string }[]): void {
        const tabsComponent = this.tabs as unknown as StvTabsComponent;
        tabsComponent.clearTabs();
        for (let tab of tabs) {
            const header = document.createElement("div");
            header.innerText = tab.header;
            header.dataset["tabId"] = tab.id;
            const content = document.createElement("div");
            content.classList.add("graph-container");
            content.classList.add("not-rendered");
            tabsComponent.addTab(header, content);
        }
    }
    
    private getVerificationState(): state.actions.Verification {
        return this.appState.action as state.actions.Verification;
    }
    
    private getVerificationModel(): state.models.SomeModel {
        return this.getVerificationState().model as state.models.SomeModel;
    }
    
    private getVerificationModelParameters(): state.models.parameters.SomeParameters {
        return this.getVerificationModel().parameters;
    }
}
