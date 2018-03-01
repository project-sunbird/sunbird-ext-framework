import { PluginManager, Manifest } from './manager/PluginManager'

export interface IFrameworkConfig {
    manifest: Manifest;
    pluginClass: any;
}

export class Framework {
    public static async initialize(config: Array<IFrameworkConfig>) {
        for (let plugin of config) {
            await PluginManager.setPluginInstance(plugin.manifest, plugin.pluginClass);
            console.log(plugin.manifest.id + "was Registered Successfully");
        }
    }
    public static getPluginInstance(pluginId): any {
        return PluginManager.getPluginInstance(pluginId);
    }
}