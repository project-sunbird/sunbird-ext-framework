import "jasmine"
import { ClientPlugin } from "../test-plugin";
import { IMenu } from "../../manager/PluginManager";
import { MenuManager } from "../../manager/MenuManager";

describe("Menu Manger Testing", () => {
    var config;
    var manifest;
    var menu;
    beforeAll(() => {
        menu = {
            id: "MenuId",
            name: "MenuName",
            displayName: "MenuDisplayName",
            type: "navigate",
            navigate: {
                URL: "string"
            }
        }
        manifest = {
            id: "Menu",
            version: "1.0.0",
            menu: menu
        }
        config = {
            manifest: manifest,
            pluginClass: ClientPlugin
        }
    });
    it("set menu item", () => {
        MenuManager.registerMenu(menu);
        var menuRegistered = MenuManager.getMenu();
        console.log('menuItem', menuRegistered);
        expect(menuRegistered.toString()).toEqual(menu.toString());
    });
    it("get menu item", () => {
        MenuManager.registerMenu(menu);
        var menuRegistered = MenuManager.getMenu();
        console.log('menuItem', menuRegistered);
        expect(menuRegistered.toString()).toEqual(menu.toString());
    });
});