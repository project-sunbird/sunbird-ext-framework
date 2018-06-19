import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Menu } from './menu';
import { MENUS } from './mock-menu';

/**
 * 
 * 
 * @export
 * @class MenuService
 */
@Injectable({
  providedIn: 'root'
})


export class MenuService {

  constructor() { }

  getMenus(): Observable<Menu[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.MenuService.add('MenuService: fetched Manus');
    return of(MENUS);
  }
}