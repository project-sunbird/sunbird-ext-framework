import { Component, OnInit } from '@angular/core';
import { EventManager, Framework } from 'web-framework';
import { ClientPlugin } from './Client';
import { manifest } from './manifest';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private _menuItems: any = {};
  private menu = [];
  plugin: any;
  constructor() {
    EventManager.addEventListener("MenuUpdated", this.updateMenuItem, "");
  }
  ngOnInit() {
    this.plugin = Framework.getPluginInstance(manifest.id);
    this.updateMenuItem();
  }

  public updateMenuItem() {
    let menu = this.plugin.getMenuObject();
    this._menuItems = menu;
    this.menuItems();
  }
  private menuItems() {
    let arr = [];
    for (let key in this._menuItems) {
      arr.push(this._menuItems[key]);
    }
    console.log(arr);
    this.menu = arr;
  }
}
