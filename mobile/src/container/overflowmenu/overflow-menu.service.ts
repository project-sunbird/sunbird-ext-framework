import { Injectable } from "@angular/core";
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { OverFlowMenuComponent } from "./overflow-menu";


@Injectable()
export class OverFlowMenuService {

  constructor(private popoverCtrl: PopoverController) {

  }


  showOverFlowMenu(pluginName: string, event: any) {
    let popover = this.popoverCtrl.create(OverFlowMenuComponent, {
      "screen": 'PROFILE'
    });
    popover.present({
      ev: event
    });
  }

}
