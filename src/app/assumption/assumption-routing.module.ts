import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StvAssumptionMainComponent } from "./stv-assumption-main/stv-assumption-main.component";
import { StvAssumptionSidebarComponent } from "./stv-assumption-sidebar/stv-assumption-sidebar.component";

const routes: Routes = [
    {
        path: "assumption",
        children: [
            {
                path: "",
                component: StvAssumptionMainComponent,
            },
            {
                path: "",
                component: StvAssumptionSidebarComponent,
                outlet: "sidebar-parameters",
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssumptionRoutingModule {}
