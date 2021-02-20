import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "stv-mode-selector",
    templateUrl: "./stv-mode-selector.component.html",
    styleUrls: ["./stv-mode-selector.component.less"],
})
export class StvModeSelectorComponent implements OnInit, OnDestroy {
    
    bisimulation: string = "";
    
    routerSubscription: Subscription;
    
    constructor(private router: Router) {
        this.routerSubscription = router.events.subscribe(value => {
            if (value instanceof NavigationEnd) {
                const path = router.getCurrentNavigation()?.finalUrl?.root.children.primary?.segments[0]?.path;
                if (path) {
                    this.bisimulation = path;
                }
            }
        });
    }
    
    ngOnInit(): void {}
    
    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
    
    onModeChanged(value: string): void {
        const url = this.router.url;
        if (url === `/${url}` || url.startsWith(`/${value}/`)) {
            return;
        }
        this.router.navigate(["/" + value]);
    }
    
}
