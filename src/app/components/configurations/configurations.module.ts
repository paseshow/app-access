import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboarComponent } from "../dashboar/dashboar.component";
import { ConfigurationsComponent } from "./configurations.component";
import { Route } from "./configurations.routing";

@NgModule({
    declarations: [
        ConfigurationsComponent,
        DashboarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(Route)
    ]
})
export class ConfigurationsModule {}