import { PluginManager, Manifest } from './manager/PluginManager'
import { FrameworkAPI } from './FrameworkAPI';
// export namespace framework { 
//     export FrameworkAPI;
// }
export * from './FrameworkAPI';
export class Framework {
    public static async initialize(manifest: Manifest, plugin: any) {
        await PluginManager.setPluginInstance(manifest, plugin);
        console.log(manifest.id + "was Registered Successfully");
    }
    public static getPluginInstance(pluginId): object {
        return PluginManager.pluginInstances[pluginId];
    }

}