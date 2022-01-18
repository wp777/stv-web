import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CommonModule } from "../common/common.module";
import { AssumptionRoutingModule } from "./assumption-routing.module";
import { StvAssumptionMainComponent } from "./stv-assumption-main/stv-assumption-main.component";
import { StvAssumptionSidebarComponent } from "./stv-assumption-sidebar/stv-assumption-sidebar.component";

@NgModule({
    declarations: [
        StvAssumptionMainComponent,
        StvAssumptionSidebarComponent,
    ],
    exports: [
        StvAssumptionMainComponent,
        StvAssumptionSidebarComponent,
    ],
    imports: [
        BrowserModule,
        AssumptionRoutingModule,
        CommonModule,
    ],
})
export class AssumptionModule {}
