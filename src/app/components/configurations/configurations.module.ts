import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboarComponent } from "../dashboar/dashboar.component";
import { ConfigurationsComponent } from "./configurations.component";
import { Route } from "./configurations.routing";
import { ScanComponent } from "./scan/scan.component";
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
    declarations: [
        ConfigurationsComponent,
        DashboarComponent,
        ScanComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(Route),
        ZXingScannerModule
    ]
})
export class ConfigurationsModule {}
export class SomeModule {}
