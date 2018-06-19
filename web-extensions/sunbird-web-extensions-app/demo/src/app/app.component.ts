// tslint:disable-next-line:max-line-length
import {Component, OnInit, ViewChild , Input,  ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, Output, EventEmitter, Directive} from '@angular/core';
import { Menu } from './menu';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="ui grid top fixed huge  menu">
    <div class="item">
      <a href="#" class="header bold">
          Web Extension Framework
      </a>
    </div>
</div>

<br>
<br>
<br>
<div class="grid ui">
<div class="ui two column grid">
  <div class="four wide column">
  <div class="ui huge fixed sidebar uncover visible overlay vertical menu extensible-document">
    <div class="item" *ngFor="let n of menus; let i = index" (click)="select(n.name);" [ngClass]="{'active': isActive(n.name)}">
      <div routerLink="/{{n.name | lowercase}}">{{n.title}} </div>
      <div style="display:none;" class="menu">
        <a routerLinkActive="active-link" routerLink="/{{child.name}}" class="item" *ngFor="let child of n.subMenu">{{child.title}}</a>
      </div>
    </div>
  </div>
  </div>
  <div class="ten wide column">
  <router-outlet></router-outlet>
  </div>
</div>
</div>


  `,
  styleUrls: ['./app.component.css'],
  providers: [],
})

export class AppComponent implements OnInit {
  menus: Menu[] = [];
  selected: any;

  @Input()
  pluginName: string;

  // tslint:disable-next-line:max-line-length
  constructor(private menuService: MenuService) {
       }

  getMenus(): void {
    this.menuService.getMenus()
      .subscribe(menus => this.menus = menus);
  }
  select(item) {
    this.selected = null;
    this.selected = (this.selected === item ? null : item);
  }



  isActive(item) {
  return  this.selected === item;
  }

  ngOnInit() {
    this.getMenus();
    this.selected = 'introduction';
  }
}

