import { NgModule } from "@angular/core";
import { DashboardPage } from "./dashboard.component";
import { IonicPageModule } from "ionic-angular";


@NgModule({
    declarations: [
        DashboardPage
    ],
    imports: [
        IonicPageModule.forChild(DashboardPage)
    ],
    entryComponents: [
        DashboardPage
    ],
    exports: [
        DashboardPage
    ]
})
export class DashBoardModule {

}