import { Component } from "@angular/core";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { ContainerService } from "../container.services";

export const KEY_SCREEN_NAME = "screen";

@Component({
  selector: 'overflow-menu',
  templateUrl: 'overflow-menu.html'
})
export class OverFlowMenuComponent {


  constructor(private containerService: ContainerService,
              private navCtrl: NavController,
              private navParams: NavParams,
              public viewCtrl: ViewController) {
    // this.screen = this.navParams.get(KEY_SCREEN_NAME);

  }

  // ionViewWillEnter() {
  //   this.menuList = this.containerService.getOverFlowMenu(this.screen);
  // }

  // onClick(menu: OverFlowMenuOptions) {
  //   this.viewCtrl.dismiss();

  //   if (menu.component !== undefined && menu.component !== null) {
  //     this.navCtrl.push(menu.component);
  //   }
  // }

}

