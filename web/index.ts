import { PluginManager, Manifest, IMenu } from './manager/PluginManager'
import { MenuManager } from './manager/MenuManager';
export * from './services/HTTPService';
export { EventManager } from './manager/EventManager';

export interface IFrameworkConfig {
    manifest: Manifest;
    pluginClass: any;
}

export class Framework {
    private static EventBus;
    public static async initialize(config: Array<IFrameworkConfig>) {
        for (let plugin of config) {
            await PluginManager.setPluginInstance(plugin.manifest, plugin.pluginClass);
            console.log(plugin.manifest.id + " was Registered Successfully");
            if (plugin.manifest.menu) {
                MenuManager.registerMenu(plugin.manifest.menu);
            }
        }
    }
    public static getPluginInstance(pluginId): any {
        return PluginManager.getPluginInstance(pluginId);
    }
}