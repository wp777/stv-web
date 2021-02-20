import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StvVerificationBridgeEndplayParametersComponent } from "./stv-verification-bridgeEndplay-parameters/stv-verification-bridgeEndplay-parameters.component";
import { StvVerificationCastlesParametersComponent } from "./stv-verification-castles-parameters/stv-verification-castles-parameters.component";
import { StvVerificationDronesParametersComponent } from "./stv-verification-drones-parameters/stv-verification-drones-parameters.component";
import { StvVerificationFromFileParametersComponent } from "./stv-verification-fromFile-parameters/stv-verification-fromFile-parameters.component";
import { StvVerificationSimpleVotingParametersComponent } from "./stv-verification-simpleVoting-parameters/stv-verification-simpleVoting-parameters.component";
import { StvVerificationTianJiParametersComponent } from "./stv-verification-tianJi-parameters/stv-verification-tianJi-parameters.component";
import { StvVerificationMainComponent } from "./stv-verification-main/stv-verification-main.component";
import { StvVerificationParametersComponent } from "./stv-verification-sidebar/stv-verification-sidebar.component";

const verificationMainComponentRoute = {
    path: "",
    pathMatch: "full",
    component: StvVerificationMainComponent,
};

const verificationParametersComponentRoute = {
    path: "",
    pathMatch: "full",
    component: StvVerificationParametersComponent,
    outlet: "sidebar-parameters",
};

const createModelParametersComponentRoute = (modelType: string, component: any) => ({
    path: modelType,
    children: [
        { ...verificationMainComponentRoute },
        {
            ...verificationParametersComponentRoute,
            children: [
                {
                    path: "",
                    pathMatch: "full",
                    component: component,
                    outlet: "verification-model-parameters",
                },
            ],
        },
    ],
});

const routes: Routes = [
    {
        path: "verification",
        pathMatch: "full",
        redirectTo: "verification/fromFile",
    },
    {
        path: "verification",
        children: [
            { ...verificationMainComponentRoute },
            { ...verificationParametersComponentRoute },
            createModelParametersComponentRoute("bridgeEndplay", StvVerificationBridgeEndplayParametersComponent),
            createModelParametersComponentRoute("castles", StvVerificationCastlesParametersComponent),
            createModelParametersComponentRoute("drones", StvVerificationDronesParametersComponent),
            createModelParametersComponentRoute("fromFile", StvVerificationFromFileParametersComponent),
            createModelParametersComponentRoute("simpleVoting", StvVerificationSimpleVotingParametersComponent),
            createModelParametersComponentRoute("tianJi", StvVerificationTianJiParametersComponent),
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VerificationRoutingModule {}
