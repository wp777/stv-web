import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import * as cytoscape from "cytoscape";
import { Subscription } from "rxjs";
import * as state from "src/app/state";
import { StvGraphService } from "./stv-graph.service";

@Component({
    selector: "stv-graph",
    templateUrl: "./stv-graph.component.html",
    styleUrls: ["./stv-graph.component.less"],
    providers: [StvGraphService]
})
export class StvGraphComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild("graphContainer")
    graphContainerRef?: ElementRef<HTMLDivElement>;

    private cy: cytoscape.Core | null = null;
    private initialized: boolean = false;
    private graph: state.models.graph.Graph | null = null;
    private isVisible: boolean = false;

    private renderedGraphZoom: number | null = null;
    private renderedShowActions: boolean | null = null;
    private renderedShowStateLabels: boolean | null = null;
    private intersectionObserver: IntersectionObserver | null = null;

    private viewSettingsSubscriptions: Subscription[] = [];

    constructor(private appState: state.AppState) {
        const viewSettings = appState.viewSettings;
        // this.viewSettingsSubscriptions.push(viewSettings.graphZoom$.subscribe(() => this.onGraphZoomChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.showActions$.subscribe(() => this.onShowActionsChanged()));
        this.viewSettingsSubscriptions.push(viewSettings.showStateLabels$.subscribe(() => this.onShowStateChanged()));
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.initialized = true;

        this.setupIntersectionObserver();


        if (this.graph) {
            // this.render(this.graph);
            // this.graphService.render(this.graph, this.graphContainerRef!.nativeElement)
        }
    }

    ngOnDestroy(): void {
        for (let subscription of this.viewSettingsSubscriptions) {
            subscription.unsubscribe();
        }
        this.intersectionObserver?.disconnect();
    }

    private setupIntersectionObserver(): void {
        this.intersectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const newIsVisible = entry.intersectionRatio > 0;
                    if (newIsVisible && !this.isVisible) {
                        this.onAfterShown();
                    }
                    else if (!newIsVisible && this.isVisible) {
                        this.onAfterHidden();
                    }
                });
            },
            {
                root: document.documentElement,
            }
        );
        this.intersectionObserver.observe(this.graphContainerRef?.nativeElement!);
    }

    // render(graph: state.models.graph.Graph): void {
    //     this.graph = graph;
    //     if (!this.initialized) {
    //         return;
    //     }

    //     // @todo YK (advanced graph rendering) + (use three consts below while initializing graph or call three methods this.update...() after graph initialization)
    //     const graphZoom = this.appState.viewSettings.graphZoom;
    //     const showActions = this.appState.viewSettings.showActions;
    //     const showStateLabels = this.appState.viewSettings.showStateLabels;
    //     this.renderedGraphZoom = graphZoom;
    //     this.renderedShowActions = showActions;
    //     this.renderedShowStateLabels = showStateLabels;
    //     const graphContainer = this.graphContainerRef!.nativeElement;


    //     const nodes = graph.nodes.map(node => ({
    //         data: {
    //             id: `n_${node.id}`,
    //             bgn: node.bgn,
    //             T: node.T
    //         }
    //     }));
    //     const edges = graph.links.map(link => ({
    //         data: {
    //             id: `e_${link.id}`,
    //             source: `n_${link.source}`,
    //             target: `n_${link.target}`,
    //             T: link.T
    //         }
    //     }));


    //     this.cy = cytoscape({
    //         container: graphContainer,
    //         elements: [
    //             ...nodes,
    //             ...edges,
    //         ],
    //         // zoomingEnabled: this.userZoomEnabled,
    //         // panningEnabled: true,
    //         wheelSensitivity: 0.6
    //     });
    // }

    // private onGraphZoomChanged(): void {
    //     if (this.cy && this.isVisible) {
    //         this.updateGraphZoom();
    //     }
    // }

    private onShowActionsChanged(): void {
        if (this.cy && this.isVisible) {
            this.updateShowActions();
        }
    }

    private onShowStateChanged(): void {
        if (this.cy && this.isVisible) {
            this.updateShowStateLabels();
        }
    }

    private onAfterHidden(): void {
        this.isVisible = false;
    }

    private onAfterShown(): void {
        this.isVisible = true;
        if (this.cy) {
            if (this.renderedGraphZoom !== this.appState.viewSettings.graphZoom) {
                // this.updateGraphZoom();
            }
            if (this.renderedShowActions !== this.appState.viewSettings.showActions) {
                this.updateShowActions();
            }
            if (this.renderedShowStateLabels !== this.appState.viewSettings.showStateLabels) {
                this.updateShowStateLabels();
            }
        }
    }


    // private updateGraphZoom(): void {
    //     // @todo YK update graph zoom
    //     console.log("updateGraphZoom", this.appState.viewSettings.graphZoom, this.graphContainerRef?.nativeElement);
    //     this.renderedGraphZoom = this.appState.viewSettings.graphZoom;
    //     this.cy?.zoom(this.appState.viewSettings.graphZoom)
    // }

    private updateShowActions(): void {
        // @todo YK show/hide actions        
        console.log("updateShowActions", this.appState.viewSettings.showActions, this.graphContainerRef?.nativeElement);
        this.renderedShowActions = this.appState.viewSettings.showActions;
    }

    private updateShowStateLabels(): void {
        // @todo YK show/hide state labels
        console.log("updateShowStateLabels", this.appState.viewSettings.showStateLabels, this.graphContainerRef?.nativeElement);
        this.renderedShowStateLabels = this.appState.viewSettings.showStateLabels;
    }

}
