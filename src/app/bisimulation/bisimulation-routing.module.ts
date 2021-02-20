import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StvBisimulationMainComponent } from "./stv-bisimulation-main/stv-bisimulation-main.component";
import { StvBisimulationSidebarComponent } from "./stv-bisimulation-sidebar/stv-bisimulation-sidebar.component";

const routes: Routes = [
    {
        path: "bisimulation",
        children: [
            {
                path: "",
                component: StvBisimulationMainComponent,
            },
            {
                path: "",
                component: StvBisimulationSidebarComponent,
                outlet: "sidebar-parameters",
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BisimulationRoutingModule {}
