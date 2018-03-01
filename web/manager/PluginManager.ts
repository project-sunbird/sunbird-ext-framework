/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventManager } from './eventManager';
import { PluginLoader } from './PluginLoader';

export interface Manifest {
    id: string,
    ver: string,
    statePath: string,
    pluginFolderName: string,
}
export interface FrameworkConfig {
    pluginBasePath: string;
}
export interface IClientPluginConstructor {
    new(config: any, manifest: Manifest)
}
export class PluginManager {
    private _config: FrameworkConfig;
    static pluginManifests: object = {};
    static plugins: object = {};
    //static pluginObjs: object = {};
    static pluginInstances: object = {};
    static errors: any = [];
    constructor(config: FrameworkConfig) {
        this._config = { ...config };
    }

    public static async registerPlugin(manifest: Manifest, config: any) {
        PluginManager.plugins[manifest.id] = { c: config, m: manifest };
        if (manifest) {
            PluginManager.pluginManifests[manifest.id] = { m: manifest };
        }
        eventManager.dispatchEvent('plugin:load', { plugin: manifest.id, version: manifest.ver });
        eventManager.dispatchEvent(manifest.id + ':load');
        //await PluginManager.instantiate(manifest);
        console.log('=====> ' + manifest.id + ' plugin loaded');
        // let p = new plugin(manifest);
        // if (manifest) {
        //     PluginManager.pluginInstances[manifest.id] = p;
        // }
    }
    public static setPluginInstance(manifest: Manifest, plugin: any) {
        PluginManager.pluginInstances[manifest.id] = new plugin();
    }
    /* public static async instantiate(manifest: Manifest) {
        let pluginFile = await import(this._config.pluginBasePath + manifest.id + '/Client');
        let pluginClass = <IClientPluginConstructor>pluginFile.ClientPlugin;
        let pluginInstance = new pluginClass(this._config, manifest);
        PluginManager.pluginInstances[manifest.id] = pluginInstance;
    } */

    public static getPluginInstance(pluginId): object {
        return PluginManager.pluginInstances[pluginId];
    }
}