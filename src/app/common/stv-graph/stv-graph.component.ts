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
    private isVisible: boolean = false;
    
    private renderedShowActions: boolean | null = null;
    private renderedShowStateLabels: boolean | null = null;
    private intersectionObserver: IntersectionObserver | null = null;
    
    private viewSettingsSubscriptions: Subscription[] = [];
    
    constructor(private appState: state.AppState) {
        const viewSettings = appState.viewSettings;
        this.viewSettingsSubscriptions.push(
            viewSettings.showActions$.subscribe(() => this.onShowActionsChanged())
        );
        this.viewSettingsSubscriptions.push(
            viewSettings.showStateLabels$.subscribe(() => this.onShowStateChanged())
        );
    }
    
    ngOnInit(): void { }
    
    ngAfterViewInit(): void {
        this.setupIntersectionObserver();
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
    
    private onShowActionsChanged(): void {
        if (this.cy && this.isVisible) {
        }
    }
    
    private onShowStateChanged(): void {
        if (this.cy && this.isVisible) {
        }
    }
    
    private onAfterHidden(): void {
        this.isVisible = false;
    }
    
    private onAfterShown(): void {
        this.isVisible = true;
        if (this.cy) {
            if (this.renderedShowActions !== this.appState.viewSettings.showActions) {
            }
            if (this.renderedShowStateLabels !== this.appState.viewSettings.showStateLabels) {
            }
        }
    }

    
}
