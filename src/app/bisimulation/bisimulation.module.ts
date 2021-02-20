import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BisimulationRoutingModule } from "./bisimulation-routing.module";
import { CommonModule } from "../common/common.module";
import { StvBisimulationMainComponent } from "./stv-bisimulation-main/stv-bisimulation-main.component";
import { StvBisimulationSidebarComponent } from "./stv-bisimulation-sidebar/stv-bisimulation-sidebar.component";

@NgModule({
    declarations: [
        StvBisimulationMainComponent,
        StvBisimulationSidebarComponent,
    ],
    exports: [
        StvBisimulationMainComponent,
        StvBisimulationSidebarComponent,
    ],
    imports: [
        BrowserModule,
        BisimulationRoutingModule,
        CommonModule,
    ],
})
export class BisimulationModule {}
