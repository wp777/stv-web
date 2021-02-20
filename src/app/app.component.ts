import { Component } from "@angular/core";
import * as state from "./state";

@Component({
    selector: "stv-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
})
export class AppComponent {
    title = "stv-web";
    
    constructor(private appState: state.AppState) {
    }
    
}
