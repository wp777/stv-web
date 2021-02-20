import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StvReductionMainComponent } from "./stv-reduction-main/stv-reduction-main.component";
import { StvReductionSidebarComponent } from "./stv-reduction-sidebar/stv-reduction-sidebar.component";

const routes: Routes = [
    {
        path: "reduction",
        children: [
            {
                path: "",
                component: StvReductionMainComponent,
            },
            {
                path: "",
                component: StvReductionSidebarComponent,
                outlet: "sidebar-parameters",
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReductionRoutingModule {}
