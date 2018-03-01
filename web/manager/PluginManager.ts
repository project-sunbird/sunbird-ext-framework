/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventManager } from './eventManager';
import {HTTPService} from '../services/HTTPService';

export interface Manifest {
    id: string;
    ver: string;
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
        console.log('=====> ' + manifest.id + ' plugin loaded');
    }
    public static setPluginInstance(manifest: Manifest, plugin: any) {
        PluginManager.pluginInstances[manifest.id] = new plugin();
    }

    public static getPluginInstance(pluginId): object {
        return PluginManager.pluginInstances[pluginId];
    }
}