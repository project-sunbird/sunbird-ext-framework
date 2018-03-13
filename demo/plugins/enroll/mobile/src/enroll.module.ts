import { NgModule } from "@angular/core";
import { EnrollPage } from "./enroll.component";
import { IonicPageModule } from "ionic-angular";
import { HTTP } from "@ionic-native/http";


@NgModule({
    declarations: [
        EnrollPage
    ],
    entryComponents: [
        EnrollPage
    ],
    imports: [
        IonicPageModule.forChild(EnrollPage)
    ],
    exports: [
        EnrollPage
    ],
    providers: [
        HTTP
    ]
})
export class EnrollModule {

}