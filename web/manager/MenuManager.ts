/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventManager } from '..';
import { IMenu } from './PluginManager';

export class MenuManager {
    private static menuObject: any = {}
    public static registerMenu(menu: IMenu) {
        this.setMenu(menu);
    }
    public static getMenu() {
        return MenuManager.menuObject;
    }
    private static setMenu(menu: IMenu) {
        if (MenuManager.menuObject[menu.id]) {
            console.log(menu.name + " is already Added to the Menu");
        } else {
            MenuManager.menuObject[menu.id] = menu;
            eventManager.dispatchEvent("MenuUpdated");
        }
    }
}