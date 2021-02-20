import { Component, OnInit } from "@angular/core";
import * as state from "src/app/state";

@Component({
    selector: "stv-reduction-sidebar",
    templateUrl: "./stv-reduction-sidebar.component.html",
    styleUrls: ["./stv-reduction-sidebar.component.less"],
})
export class StvReductionSidebarComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.appState.action = new state.actions.Reduction();
    }

    ngOnInit(): void {}
    
}
