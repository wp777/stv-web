import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import { StvGraphComponent } from "src/app/common/stv-graph/stv-graph.component";
import { StvGraphService } from "src/app/common/stv-graph/stv-graph.service";
import * as state from "src/app/state";

@Component({
    selector: "stv-bisimulation-main",
    templateUrl: "./stv-bisimulation-main.component.html",
    styleUrls: ["./stv-bisimulation-main.component.less"],
    providers: [StvGraphService]
})
export class StvBisimulationMainComponent implements OnInit {
    
    @ViewChild("graph1", { read: ViewContainerRef })
    graph1Ref?: ViewContainerRef;
    
    @ViewChild("graph2", { read: ViewContainerRef })
    graph2Ref?: ViewContainerRef;
    
    get graph1Container(): HTMLElement {
        return this.graph1Ref?.element.nativeElement! as unknown as HTMLElement;
    }
    
    get graph2Container(): HTMLElement {
        return this.graph2Ref?.element.nativeElement! as unknown as HTMLElement;
    }
    
    appStateSubscription: Subscription;

    private graphService: StvGraphService = new StvGraphService();
    
    constructor(private appState: state.AppState, private componentFactoryResolver: ComponentFactoryResolver) {
        this.appStateSubscription = appState.state$
            .pipe(debounce(() => interval(10)))
            .subscribe(() => this.onAppStateChanged());
    }

    ngOnInit(): void {}
    
    onAppStateChanged(): void {
        const graph1 = this.getBisimulationModel1()?.globalModel;
        const graph2 = this.getBisimulationModel2()?.globalModel;
        if (graph1 && this.graph1Ref && this.graph1Container.classList.contains("not-rendered")) {
            this.renderGraph(graph1, this.graph1Ref);
        }
        if (graph2 && this.graph2Ref && this.graph2Container.classList.contains("not-rendered")) {
            this.renderGraph(graph2, this.graph2Ref);
        }
    }
    
    renderGraph(graph: state.models.graph.Graph, graphContainerRef: ViewContainerRef): void {
        const graphComponentFactory = this.componentFactoryResolver.resolveComponentFactory(StvGraphComponent);
        const graphComponentRef = graphContainerRef!.createComponent(graphComponentFactory);
        graphContainerRef.element.nativeElement.append(graphComponentRef.location.nativeElement);
        this.graphService.render(graph, graphComponentRef.location.nativeElement.children[0] as HTMLDivElement);
        graphContainerRef.element.nativeElement.classList.remove("not-rendered");
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
    
}
