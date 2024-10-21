import { Injectable } from "@angular/core";
import * as state from "src/app/state";
import * as cytoscape from "cytoscape";
import * as popper from "cytoscape-popper";
import tippy, { Tippy } from "tippy.js";
import { WrappedNodeExpr } from "@angular/compiler";
import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";
import { concat, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StvGraphService {

    private cy: cytoscape.Core | null = null;
    private userZoomEnabled: boolean = true;
    private zoomAnimationSpeed: number = 200;

    public stateLabels: Array<any> = []; // list of unique state labels
    public actionLabels: Array<any> = []; // list of unique action labels
    private graphLayout: Object = {};

    constructor() { }
    
    render(graph: state.models.graph.Graph, graphContainer: HTMLDivElement): void {
        const nodes: cytoscape.ElementDefinition[] = graph.nodes.map(node => ({
            data: {
                id: `n_${node.id}`,
                bgn: node.bgn,
                win: node.win,
                str: node.str,
                T: node.T,
            },
            classes: "withStateLabels " + (node.bgn ? "bgn" : "") + (node.win ? "win" : "") + (node.str ? "str" : ""),
        }));        
         
        const edges: cytoscape.ElementDefinition[] = graph.links.map(link => ({
            data: {
                id: `e_${link.id}`,
                source: `n_${link.source}`,
                target: `n_${link.target}`,
                str: link.str,
                T: link.T,
            },
            classes: "withActionLabels " + (link.str ? "str" : ""),
        }));

        this.cy = cytoscape({
            container: graphContainer,
            elements: [...nodes, ...edges], // Combine nodes and edges into a single array
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)',
                        'text-valign': 'center',
                        'color': '#fff',
                        'font-size': '10px',
                        'width': '20px',
                        'height': '20px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(id)',
                        'font-size': '8px',
                        'color': '#000'
                    }
                },
                {
                    selector: '.bgn',
                    style: {
                        'background-color': '#6FB1FC'
                    }
                },
                {
                    selector: '.win',
                    style: {
                        'background-color': '#86B342'
                    }
                },
                {
                    selector: '.str',
                    style: {
                        'background-color': '#F5A45D'
                    }
                }
            ],
            layout: {
                name: 'cose',
                animate: true,
                animationDuration: this.zoomAnimationSpeed
            },
            userZoomingEnabled: this.userZoomEnabled,
            userPanningEnabled: true
        });

        this.cy.nodes().forEach(node => {
            const ref = node.popperRef();
            const tooltip = tippy(ref, {
                content: () => {
                    const content = document.createElement('div');
                    content.innerHTML = `ID: ${node.id()}<br>State: ${JSON.stringify(node.data().T)}`;
                    return content;
                },
                trigger: 'manual'
            });
            node.on('mouseover', () => tooltip.show());
            node.on('mouseout', () => tooltip.hide());
        });

        this.computeStateLabelsList([nodes.map(x => Object.keys(x.data.T))]);
    }

    private stateLabelsToString(el: cytoscape.EdgeSingular, showAll:boolean = false) {
        const visible = this.stateLabels.reduce( (acc,x)=>((acc as any)[x.name]=x.display,acc),{});
        let labels = Object.entries(el.data("T"));
        if(!showAll)labels = labels.filter(x=> visible[x[0]])

        return labels.length>0 ? "{"+labels.map(x=>x[0]+":"+JSON.stringify(x[1])).join(',\n ')+"}" : "";
        // return JSON.stringify(el.data("T")).replace(/\"/g, "").split(',').join(',\n ');
    }

    private actionLabelsToString(el:cytoscape.EdgeSingular, showAll:boolean = false){
        const visible = this.actionLabels.reduce( (acc,x)=>((acc as any)[x.name]=(showAll ? true:x.display),acc),{});
        if(!Object.values(visible).some(x=>x==true) || !Array.isArray(el.data("T")))return "";
        
        const labels = el.data("T").map((x: string) => visible[x] ? x : "_" );
        return labels.length>0 ? "("+labels.join(', ')+")" : "";
    }

    private computeStateLabelsList(arr:Array<any>){
        this.stateLabels = [...new Set(flatDeep(arr,2))]
        .map(x => ({"name": x, "display": false}));        
    }

    private computeActionLabelsList(arr:Array<any>){
        this.actionLabels = [...new Set(flatDeep(arr,2))]
            .map(x => ({"name": x, "display": false}));
    }

    // @todo YK: re-work fix (make it less ugly)
    reloadStateLabels(): void{
        this.toggleStateLabels();
        this.toggleStateLabels();
    }

    toggleStateLabels(): void {
        this.cy?.nodes().toggleClass("withStateLabels");
    }

    reloadActionLabels(): void{
        this.toggleActionLabels();
        this.toggleActionLabels();
    }

    toggleActionLabels(): void {
        this.cy?.edges().toggleClass("withActionLabels");
    }

    setZoom(step: number, withAnimation: boolean = true): void {
        if (!this.cy) {
            return;
        }

        let val = this.cy.zoom() * step;
        if (withAnimation) {
            this.cy.userZoomingEnabled(false);
            this.cy.stop().animate(
                {
                    zoom: val,
                },
                {
                    duration: this.zoomAnimationSpeed,
                    complete: () => {
                        this.cy?.userZoomingEnabled(this.userZoomEnabled);
                    },
                    // @todo use this.userZoomEnabled for integrity with interleaving function calls
                }
            );
        }
        else {
            this.cy.zoom(val);
        }
    }

    zoomToFit(withAnimation: boolean = true) {
        if (!this.cy) {
            return;
        }

        if (withAnimation) {
            this.cy.userZoomingEnabled(false);
            this.cy.stop().animate(
                {
                    fit: {
                        eles: "",
                        padding: 30,
                    },
                },
                {
                    duration: this.zoomAnimationSpeed,
                    complete: () => {
                        this.cy?.userZoomingEnabled(this.userZoomEnabled);
                    },
                }
            );
        }
        else {
            this.cy.fit();
        }
    }

    reloadLayout(){
        this.cy?.layout(<cytoscape.BaseLayoutOptions>this.graphLayout).run();
    }

    changeLayout(_name:string, ...args:any){
        switch (_name) {
            case "bfs":
                this.graphLayout = {
                    name: 'breadthfirst',
                    fit: true, // whether to fit the viewport to the graph
                    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
                    padding: 30, // padding on fit
                    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
                    nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
                    roots: this.cy?.nodes(".bgn").map(x=>x.data("id")), // the roots of the trees
                    animate: false, // whether to transition the node positions
                  }
                break;
            case "grid":

                break;
            case "cose":
                this.graphLayout = {
                    name: _name,
                    animate: false,
                    fit: true,
                    padding: 30,
                    nodeDimensionsIncludeLabels:true
                }
                break;
        
            default:
                break;
        }
    }

    clearStrategy() {
        this.cy?.nodes().removeClass("str");
        this.cy?.edges().removeClass("str");
    }

    showStrategy(strategyModel: state.models.graph.Graph) {
        this.clearStrategy();

        strategyModel.nodes.forEach(node => {
            if(node.str) {
                this.cy?.$id(`n_${node.id}`).addClass("str");
            }
        });

        strategyModel.links.forEach(link => {
            if(link.str) {
                this.cy?.$id(`e_${link.id}`).addClass("str");
            }
        });
    }

}
function flatDeep(arr:Array<any>, d = 1): Array<any> {
    return d > 0 ? arr.reduce((acc:any, val:any) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                 : arr.slice();
};