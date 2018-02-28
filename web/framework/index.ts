import { PluginManager, Manifest } from './manager/PluginManager'
import { FrameworkAPI } from './FrameworkAPI';
// export namespace framework { 
//     export FrameworkAPI;
// }
export * from './FrameworkAPI';
export class Framework {
    public static async initialize(manifest: Manifest, plugin: any) {
        await PluginManager.registerPlugin(manifest, plugin);
        console.log(plugin.name + "was Registered Successfully");
    }

}