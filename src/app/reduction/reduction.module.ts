import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CommonModule } from "../common/common.module";
import { ReductionRoutingModule } from "./reduction-routing.module";
import { StvReductionMainComponent } from "./stv-reduction-main/stv-reduction-main.component";
import { StvReductionSidebarComponent } from "./stv-reduction-sidebar/stv-reduction-sidebar.component";

@NgModule({
    declarations: [
        StvReductionMainComponent,
        StvReductionSidebarComponent,
    ],
    exports: [
        StvReductionMainComponent,
        StvReductionSidebarComponent,
    ],
    imports: [
        BrowserModule,
        ReductionRoutingModule,
        CommonModule,
    ],
})
export class ReductionModule {}
