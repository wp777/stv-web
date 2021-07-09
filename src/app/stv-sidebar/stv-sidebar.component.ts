import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

enum TabId {
    DETAILS = "details",
    GENERATE = "generate",
    VERIFY = "verify",
}

@Component({
    selector: "stv-sidebar",
    templateUrl: "./stv-sidebar.component.html",
    styleUrls: ["./stv-sidebar.component.less"],
})
export class StvSidebarComponent implements OnInit {
    
    @ViewChild("upperContainer")
    upperContainerRef?: ElementRef<HTMLDivElement>;
    
    @ViewChild("sidebarTabs")
    sidebarTabsRef?: ElementRef<HTMLDivElement>;
    
    constructor() {
    }

    ngOnInit(): void {}
    
    onTabClick(event: MouseEvent): void {
        const li = (event.target as HTMLElement).closest("li[data-sidebar-tab-button-id]");
        if (!li || li.classList.contains("active")) {
            return;
        }
        const tabId = li.getAttribute("data-sidebar-tab-button-id") as TabId;
        this.setActiveTab(tabId);
    }
    
    setActiveTab(tabId: TabId): void {
        this.upperContainerRef?.nativeElement.setAttribute("data-sidebar-selected-tab-id", tabId);
        this.sidebarTabsRef?.nativeElement.querySelector(`[data-sidebar-tab-button-id].active`)?.classList.remove("active");
        this.sidebarTabsRef?.nativeElement.querySelector(`[data-sidebar-tab-button-id="${tabId}"]`)?.classList.add("active");
    }
    
}
