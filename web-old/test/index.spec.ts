import "jasmine";
import { Framework } from "../index";
import { PluginManager, IMenu } from "../manager/PluginManager";
import { ClientPlugin } from "./test-plugin";
import { MenuManager } from "../manager/MenuManager";

describe("framework Testing", () => {
    var config;
    var manifest;

    beforeAll(() => {
        const menu: IMenu = {
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
        //Framework.initialize([config]);
    })
    it('framework initialisation', () => {
        spyOn(PluginManager, "setPluginInstance");
        Framework.initialize([config]);
        expect(PluginManager.setPluginInstance).toHaveBeenCalled();
        expect(PluginManager.setPluginInstance).toHaveBeenCalledWith(manifest, ClientPlugin);
    });
})
