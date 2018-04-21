import { Component, ViewChild } from '@angular/core';
import { ContainerService } from '../container.services';
import { Tabs, Tab, Events } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tabs = [];

  constructor(private container: ContainerService, private navParams: NavParams,private events : Events) {
  }

  ionViewWillEnter() {
    this.tabs = this.container.getAllTabs();

    setTimeout(() => {
      let tabIndex = 0;
      if (this.navParams.get('loginMode') == 'guest') {
        tabIndex = 1;
      }
      this.tabRef.select(tabIndex);
    }, 300);

  }

  public ionChange(tab: Tab) {
    this.events.publish("tab.change",tab.tabTitle);
  }
}
