import { Component } from "@angular/core";
import { NavController, IonicPage } from 'ionic-angular';
import { BasePlugin, ContainerService } from "sunbird-framework";

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    styleUrls: [
        'profile.scss'
    ]
})
export class ProfilePage implements BasePlugin {
    list: Array<String> = ['SWITCH_ACCOUNT', 'DOWNLOAD_MANAGER', 'SETTINGS', 'SIGN_OUT'];
    lastLoginTime: string = "Last login time:Feb 13,2018,3:20:05 PM";
    userName: string = "User Name-vinayagasundar";
    profileName: string = "Boss Name";
    sunbird: string = "Sunbird";
    profileCompletionText: string = "Your profile is 82% completed";
    progValue: string = "82";
    profDesc: string = "Here are the detailed description of the profile fdhfh Here are the detailed description of the profile fdhfh";
    uncompletedDetails: string = "+ Add Experience";

    constructor(public navCtrl: NavController) {
    }

    init(container: ContainerService) {
        container.addTab({root: ProfilePage, label: "Profile", icon: "person", index: 1});
    }
}