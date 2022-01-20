import { Injectable } from "@angular/core";
import * as state from "src/app/state";
import * as cytoscape from "cytoscape";
import * as popper from "cytoscape-popper";
import tippy, { Tippy } from "tippy.js";
import { WrappedNodeExpr } from "@angular/compiler";
import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";
import { concat, Observable, of } from "rxjs";


export class StvGraphService {

    private cy: cytoscape.Core | null = null;
    private userZoomEnabled: boolean = true;
    private zoomAnimationSpeed: number = 200;

    public stateLabels: Array<any> = []; // list of unique state labels
    public actionLabels: Array<any> = []; // list of unique action labels
    private graphLayout: Object = {};


    constructor() { }
    
    render(graph: state.models.graph.Graph, graphContainer: HTMLDivElement): void {
        // @todo YK (advanced graph rendering) + (use three consts below while initializing graph or call three methods this.update...() after graph initialization)
        const nodes: cytoscape.ElementDefinition[] = graph.nodes.map(node => ({
            data: {
                id: `n_${node.id}`,
                bgn: node.bgn,
                win: node.win,
                str: node.str,
                T: node.T,
                // tippy: this.makePopper(node),
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

        this.computeStateLabelsList([nodes.map(x => Object.keys(x.data.T))])
        this.computeActionLabelsList(edges.map(x => x.data.T))

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
                    // label: "data(T)",
                    label: (el: cytoscape.EdgeSingular) => this.actionLabelsToString(el),
                    "text-outline-color": "white",
                    "text-outline-width": "1px",
                },
            },
            {
                selector: "node",
                style: {
                    "background-color": "#36454f",
                }
            },
            {
                selector: ".bgn",
                style: {
                    "background-color": "#26619c",
                },
            }, 
            {
                selector: ".win",
                style: {
                    "background-color": "#4cbb17",
                },
            },
            {
                selector: ".str",
                style: {
                    "background-color": "purple",
                },
            },
            {
                selector: "edge",
                style: {
                    "width": "3px",
                    "curve-style": "bezier",
                    "target-arrow-shape": "triangle",
                }
            },
        ];

        // console.log(nodes.filter(x=>(x.classes || "").includes("bgn")).map(x=>x.data.id));
        
        
        // @todo YK add cytoscape-node-html-label extention for better label render performance
        this.graphLayout = { // "cytoscape.LayoutOptions | cytoscape.BaseLayoutOptions" type leads to errors
            name: 'breadthfirst',
            fit: true,
            directed: true,
            padding: 30, 
            spacingFactor: 1.75, 
            nodeDimensionsIncludeLabels: true,
            // roots: this.cy?.nodes(".bgn").map(x=>x.data("id")), // the roots of the trees
            roots: nodes.filter(x=>(x.classes || "").includes("bgn")).map(x=>x.data.id),
            animate: false, 
        };
        // @todo add graph loading mask
        this.cy = cytoscape({
            container: graphContainer,
            elements: [...nodes, ...edges],
            zoomingEnabled: this.userZoomEnabled,
            panningEnabled: true,
            wheelSensitivity: 0.2,
            layout: <cytoscape.BaseLayoutOptions> this.graphLayout,
            style: styleArr,
        });

        // console.log([this.cy.nodes().map(x=>Object.keys(x.data('T')))].flat());
        // console.log(this.cy);
        this.cy.elements().on('click', (e) =>{
            let el = e.target;
            // console.log(e.target);
            
            if(el.isNode()){
                console.log(this.stateLabelsToString(el,true));
            }else if(el.isEdge()){
                console.log(this.actionLabelsToString(el,true));
            }
        })

        // this.cy.elements().unbind('mouseover');
        // this.cy.elements().bind('mouseover', (event) => event.target.tippy.show());

        // this.cy.elements().unbind('mouseout');
        // this.cy.elements().bind('mouseout', (event) => event.target.tippy.hide());
    }

    // private makePopper(ele: state.models.graph.Node) {
    //     let ref = ele.popperRef(); // used only for positioning
    //     let dummyDomEle = document.createElement('div');

        
    //     ele.tippy = tippy(dummyDomEle, { // tippy options:
    //         getReferenceClientRect: ref.getBoundingClientRect, // https://atomiks.github.io/tippyjs/v6/all-props/#getreferenceclientrect
    //         trigger: 'manual', // mandatory, we cause the tippy to show programmatically.
   
    //         content: () => {
    //             let content = document.createElement('div');
    //             let labels = Object.entries(ele.T);
        
    //             content.innerHTML = labels.length>0 ? "{"+labels.map(x=>x[0]+":"+JSON.stringify(x[1])).join(',\n ')+"}" : "";
        
    //             return content;
    //         },
    //     });
    // }

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

}
function flatDeep(arr:Array<any>, d = 1): Array<any> {
    return d > 0 ? arr.reduce((acc:any, val:any) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                 : arr.slice();
 };