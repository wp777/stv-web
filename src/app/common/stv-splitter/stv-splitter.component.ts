import { Component, OnInit } from "@angular/core";

@Component({
    selector: "stv-splitter",
    templateUrl: "./stv-splitter.component.html",
    styleUrls: ["./stv-splitter.component.less"],
})
export class StvSplitterComponent implements OnInit {
    
    private onWindowMouseMoveBound = this.onDocumentMouseMove.bind(this);
    private onWindowMouseUpBound = this.onDocumentMouseUp.bind(this);
    private mode: "horizontal" | "vertical" = "vertical";
    private targetElement?: HTMLElement;
    private targetElementSize: number = 0;
    private targetElementMinSize: number = 0;
    private targetElementMaxSize: number = 0;
    private dragStartPos: number = 0;
    
    constructor() {}

    ngOnInit(): void {}
    
    onMouseDown(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        
        const containerElement = (event.target as any).parentElement.parentElement as HTMLElement;
        this.mode = getComputedStyle(containerElement).flexDirection == "row" ? "vertical" : "horizontal";
        
        this.dragStartPos = this.mode == "vertical" ? event.screenX : event.screenY;
        this.targetElement = (event.target as any).parentElement.nextElementSibling;
        const style = getComputedStyle(this.targetElement!);
        this.targetElementSize = parseFloat(this.mode == "vertical" ? style.width : style.height);
        this.targetElementMinSize = parseFloat(this.mode == "vertical" ? style.minWidth : style.minHeight);
        this.targetElementMaxSize = parseFloat(this.mode == "vertical" ? style.maxWidth : style.maxHeight);
        
        document.addEventListener("mouseup", this.onWindowMouseUpBound);
        document.addEventListener("mousemove", this.onWindowMouseMoveBound);
    }
    
    private onDocumentMouseMove(event: MouseEvent): void {
        const pos = this.mode == "vertical" ? event.screenX : event.screenY;
        const deltaPos = pos - this.dragStartPos;
        const newElementSize = Math.min(this.targetElementMaxSize, Math.max(this.targetElementMinSize, this.targetElementSize - deltaPos));
        const newElementSizePx = `${newElementSize}px`;
        if (this.mode == "vertical") {
            this.targetElement!.style.width = newElementSizePx;
        }
        else {
            this.targetElement!.style.height = newElementSizePx;
        }
    }
    
    private onDocumentMouseUp(event: MouseEvent): void {
        document.removeEventListener("mouseup", this.onWindowMouseUpBound);
        document.removeEventListener("mousemove", this.onWindowMouseMoveBound);
    }
    
}
