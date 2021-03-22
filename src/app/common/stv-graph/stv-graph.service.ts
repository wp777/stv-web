import { Injectable } from "@angular/core";
import * as state from "src/app/state";
import * as cytoscape from "cytoscape";

@Injectable({
    providedIn: "root",
})
export class StvGraphService {
    
    private cy: cytoscape.Core | null = null;
    private userZoomEnabled: boolean = true;
    private zoomAnimationSpeed: number = 200;

    constructor() {}
    
    render(graph: state.models.graph.Graph, graphContainer: HTMLDivElement): void {
        // @todo YK (advanced graph rendering) + (use three consts below while initializing graph or call three methods this.update...() after graph initialization)
        console.log(graph);
        
        const nodes: cytoscape.ElementDefinition[] = graph.nodes.map(node => ({
            data: {
                id: `n_${node.id}`,
                bgn: node.bgn,
                T: node.T,
            },
            classes: node.bgn ? "bgn" : "",
        }));
        
        const edges: cytoscape.ElementDefinition[] = graph.links.map(link => ({
            data: {
                id: `e_${link.id}`,
                source: `n_${link.source}`,
                target: `n_${link.target}`,
                T: link.T,
            },
        }));
        
        // @todo beautify labels
        const styleArr: cytoscape.Stylesheet[] = [
            {
                selector: ".withStateLabels",
                style: {
                    label: (el: cytoscape.EdgeSingular) => JSON.stringify(el.data("T")).split(',').join(',\n'),
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
            },{
                selector: "edge",
                style: {
                    "width": "3px",
                    "curve-style":"bezier",
                    "target-arrow-shape":"triangle",
                }
            },{
                selector:"node",
                style: {
                }
            }
        ];
        
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
            },
            style: styleArr,
        });

        
        console.log(this.cy);
    }
    
    toggleStateLabels(): void {
        this.cy?.nodes().toggleClass("withStateLabels");
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
