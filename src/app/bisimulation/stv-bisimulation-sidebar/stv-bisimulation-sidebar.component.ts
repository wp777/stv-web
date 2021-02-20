import { Component, OnInit } from "@angular/core";
import * as state from "src/app/state";

@Component({
    selector: "stv-bisimulation-sidebar",
    templateUrl: "./stv-bisimulation-sidebar.component.html",
    styleUrls: ["./stv-bisimulation-sidebar.component.less"],
})
export class StvBisimulationSidebarComponent implements OnInit {
    
    constructor(private appState: state.AppState) {
        this.appState.action = new state.actions.Bisimulation();
    }

    ngOnInit(): void {}
    
}
