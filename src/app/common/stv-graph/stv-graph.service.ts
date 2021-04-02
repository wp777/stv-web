import { Injectable } from "@angular/core";
import * as state from "src/app/state";
import * as cytoscape from "cytoscape";
import { WrappedNodeExpr } from "@angular/compiler";
import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root", // singleton service
})
export class StvGraphService {

    private cy: cytoscape.Core | null = null;
    private userZoomEnabled: boolean = true;
    private zoomAnimationSpeed: number = 200;

    public stateLabels: Array<any> = [];
    public actionLabels: Array<any> = [];



    constructor() { }
    
    render(graph: state.models.graph.Graph, graphContainer: HTMLDivElement): void {
        // @todo YK (advanced graph rendering) + (use three consts below while initializing graph or call three methods this.update...() after graph initialization)
        console.log(graph);

        const nodes: cytoscape.ElementDefinition[] = graph.nodes.map(node => ({
            data: {
                id: `n_${node.id}`,
                bgn: node.bgn,
                T: node.T,
            },
            classes: "withStateLabels " + (node.bgn ? "bgn" : ""),
        }));

        this.stateLabels = [...new Set([nodes.map(x => Object.keys(x.data.T))].flat(2))]
            // .map(x => ({
            //     name: x,
            //     _show: false,
            //     get val(){
            //         return this._show;
            //     },
            //     set val(x){
            //         this._show = x;
            //     }
            // }));
            .map(x => ({"name": x, "val": false}));
            // .reduce( (obj,key)=>((obj as any)[key]=false,obj), {})

        

        const edges: cytoscape.ElementDefinition[] = graph.links.map(link => ({
            data: {
                id: `e_${link.id}`,
                source: `n_${link.source}`,
                target: `n_${link.target}`,
                T: link.T,
            },
            classes: "withActionLabels"
        }));

        this.actionLabels = [...new Set([edges.map(x => x.data.T)].flat(2))]
            .map(x => ({"name": x, "val": false}));

        // @todo beautify labels
        const styleArr: cytoscape.Stylesheet[] = [
            {
                selector: ".withStateLabels",
                style: {
                    label: (el: cytoscape.EdgeSingular) => this.stateLabelsToString(el),
                    "text-outline-color": "white",
                    "text-outline-width": "1px",
                    "text-wrap": "wrap",
                    "text-valign": "center",
                    "text-halign": "right",
                },
            },
            {
                selector: ".withActionLabels",
                style: {
                    label: "data(T)",
                    "text-outline-color": "white",
                    "text-outline-width": "1px",
                },
            },
            {
                selector: ".bgn",
                style: {
                    "background-color": "blue",
                },
            }, {
                selector: "edge",
                style: {
                    "width": "3px",
                    "curve-style": "bezier",
                    "target-arrow-shape": "triangle",
                }
            }, {
                selector: "node",
                style: {
                }
            }
        ];

        // @todo YK add cytoscape-node-html-label extention for better label render performance
        
        // @todo add graph loading mask
        this.cy = cytoscape({
            container: graphContainer,
            elements: [...nodes, ...edges],
            zoomingEnabled: this.userZoomEnabled,
            panningEnabled: true,
            wheelSensitivity: 0.2,
            layout: {
                name: "cose",
                animate: false,
                fit: true,
                padding: 30,
                nodeDimensionsIncludeLabels:true
            },
            style: styleArr,
        });

        // console.log([this.cy.nodes().map(x=>Object.keys(x.data('T')))].flat());
        console.log(this.cy);
    }

    private stateLabelsToString(el: cytoscape.EdgeSingular) {
        const visible = this.stateLabels.reduce( (acc,x)=>((acc as any)[x.name]=x.val,acc),{});
        const labels = JSON.stringify(el.data("T")).replace(/\"/g, "")
            .replace(/[\{\}]/g, "")
            .split(',')
            .filter(x => visible[x.split(':')[0]] || false );

        
        return labels.length>0 ? "{"+labels.join(',\n ')+"}" : "";
        // return JSON.stringify(el.data("T")).replace(/\"/g, "").split(',').join(',\n ');
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

}
