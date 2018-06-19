import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';
import { SuiPopupConfig } from "ng2-semantic-ui";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menus: Menu[] = [];
  constructor(private menuService: MenuService, popupConfig:SuiPopupConfig) { 
    popupConfig.isInverted = true;
    popupConfig.delay = 300;
  }

  ngOnInit() {
    this.getMenus();
  }
  getMenus(): void {
    this.menuService.getMenus()
      .subscribe(menus => this.menus = menus);
  }
}
