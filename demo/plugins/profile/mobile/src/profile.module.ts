import { NgModule } from "@angular/core";
import { ProfilePage } from "./profile";
import { IonicPageModule } from "ionic-angular";
import { FrameworkModule } from "sunbird-framework";

@NgModule({
    declarations: [
        ProfilePage
    ],
    entryComponents: [
        ProfilePage
    ],imports: [
        FrameworkModule,
        IonicPageModule.forChild(ProfilePage)
    ],
    exports: [
        ProfilePage
    ]
})
export class ProfilePageModule {

}