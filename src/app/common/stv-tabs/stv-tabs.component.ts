import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";

@Directive({selector: '[slot=header]'})
export class Pane {
}

@Component({
    selector: "stv-tabs",
    templateUrl: "./stv-tabs.component.html",
    styleUrls: ["./stv-tabs.component.less"],
})
export class StvTabsComponent implements OnInit, AfterViewInit {
    
    @Output()
    tabActivated = new EventEmitter<{ tabHeader: HTMLElement, tabContent: HTMLElement }>();
    
    @ViewChild("header")
    headerRef?: ElementRef;
    
    @ViewChild("content")
    contentRef?: ElementRef;
    
    get header(): HTMLDivElement | null | undefined {
        return this.headerRef?.nativeElement;
    }
    
    get content(): HTMLDivElement | null | undefined {
        return this.contentRef?.nativeElement;
    }
    
    get selectedHeader(): HTMLDivElement | null | undefined {
        return this.header?.querySelector(".active");
    }
    
    get selectedContent(): HTMLDivElement | null | undefined {
        return this.content?.querySelector(".active");
    }
    
    constructor() {}
    
    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
        this.ensureAnyTabActive();
    }
    
    onTabsHeaderClick(event: MouseEvent): void {
        if (!(event.target instanceof HTMLElement) || !event.target || event.target.parentElement !== this.header) {
            return;
        }
        const nodes = event.target.parentElement?.childNodes;
        const index = Array.prototype.indexOf.call(nodes, event.target);
        this.selectNthTab(index);
    }
    
    ensureAnyTabActive(): void {
        const selectedHeader = this.selectedHeader;
        if (!selectedHeader) {
            this.selectFirst();
        }
    }
    
    selectFirst(): void {
        this.selectNthTab(0);
    }
    
    selectNthTab(tabIndex: number): void {
        const selectedHeader = this.selectedHeader;
        const selectedContent = this.selectedContent;
        const header = this.header?.children[tabIndex] as HTMLElement | undefined;
        const content = this.content?.children[tabIndex] as HTMLElement | undefined    ;
        if (!header || !content || (header == selectedHeader || content == selectedContent)) {
            return;
        }
        if (selectedHeader) {
            selectedHeader.classList.remove("active");
        }
        if (selectedContent) {
            selectedContent.classList.remove("active");
        }
        header.classList.add("active");
        content.classList.add("active");
        this.emitTabActivated(header, content);
    }
    
    addTab(header: HTMLDivElement, content: HTMLDivElement): void {
        header.setAttribute("slot", "header");
        content.setAttribute("slot", "content");
        this.header?.appendChild(header);
        this.content?.appendChild(content);
        this.ensureAnyTabActive();
    }
    
    clearTabs(): void {
        this.header!.innerHTML = "";
        this.content!.innerHTML = "";
    }
    
    private emitTabActivated(tabHeader: HTMLElement, tabContent: HTMLElement): void {
        this.tabActivated.emit({ tabHeader, tabContent });
    }
    
}
