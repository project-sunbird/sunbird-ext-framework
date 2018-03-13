import { NgModule } from "@angular/core";
import { HomePage } from "./home.component";
import { IonicPageModule } from "ionic-angular";

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage)
    ],
    entryComponents: [
        HomePage
    ],
    exports: [
        HomePage
    ]
})
export class HomeModule {

}