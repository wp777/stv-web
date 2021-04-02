import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { StvFileInputComponent } from "./stv-file-input/stv-file-input.component";
import { StvGraphComponent } from "./stv-graph/stv-graph.component";
import { StvModelTabsComponent } from "./stv-model-tabs/stv-model-tabs.component";
import { StvSelectComponent } from "./stv-select/stv-select.component";
import { StvSplitterComponent } from "./stv-splitter/stv-splitter.component";
import { StvTabsComponent } from "./stv-tabs/stv-tabs.component";
import { StvExpansionPanelComponent } from './stv-expansion-panel/stv-expansion-panel.component';

@NgModule({
    declarations: [
        StvFileInputComponent,
        StvGraphComponent,
        StvModelTabsComponent,
        StvSelectComponent,
        StvSplitterComponent,
        StvTabsComponent,
        StvExpansionPanelComponent,
    ],
    exports: [
        StvFileInputComponent,
        StvGraphComponent,
        StvModelTabsComponent,
        StvSelectComponent,
        StvSplitterComponent,
        StvTabsComponent,
        StvExpansionPanelComponent,
    ],
    imports: [
        BrowserModule,
    ],
})
export class CommonModule {}
