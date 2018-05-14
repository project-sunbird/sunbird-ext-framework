import "jasmine";
import { PluginManager, IMenu } from "../../manager/PluginManager";
import { ClientPlugin } from "../test-plugin";

describe("Plugin Manger Testing", () => {
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
    });
    it("Set plugin Instance", () => {
        PluginManager.setPluginInstance(manifest, ClientPlugin);
        var pluginInstance = PluginManager.getPluginInstance(manifest.id);
        console.log('obj', pluginInstance);
        expect(pluginInstance).toEqual(new ClientPlugin());
    });
    it("get plugin Instance", () => {
        PluginManager.setPluginInstance(manifest, ClientPlugin);
        var pluginInstance = PluginManager.getPluginInstance(manifest.id);
        console.log('obj', pluginInstance);
        expect(pluginInstance).toEqual(new ClientPlugin());
    });
});