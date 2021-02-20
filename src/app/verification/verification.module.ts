import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CommonModule } from "../common/common.module";
import { StvVerificationFromFileParametersComponent } from "./stv-verification-fromFile-parameters/stv-verification-fromFile-parameters.component";
import { StvVerificationMainComponent } from "./stv-verification-main/stv-verification-main.component";
import { StvVerificationParametersComponent } from "./stv-verification-sidebar/stv-verification-sidebar.component";
import { VerificationRoutingModule } from "./verification-routing.module";

@NgModule({
    declarations: [
        StvVerificationFromFileParametersComponent,
        StvVerificationParametersComponent,
        StvVerificationMainComponent,
    ],
    exports: [
        StvVerificationFromFileParametersComponent,
        StvVerificationParametersComponent,
        StvVerificationMainComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        VerificationRoutingModule,
    ],
})
export class VerificationModule {}
