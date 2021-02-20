import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { StvFileInputComponent } from "./stv-file-input/stv-file-input.component";
import { StvSelectComponent } from "./stv-select/stv-select.component";
import { StvSplitterComponent } from "./stv-splitter/stv-splitter.component";

@NgModule({
    declarations: [
        StvFileInputComponent,
        StvSelectComponent,
        StvSplitterComponent,
    ],
    exports: [
        StvFileInputComponent,
        StvSelectComponent,
        StvSplitterComponent,
    ],
    imports: [
        BrowserModule,
    ],
})
export class CommonModule {}
