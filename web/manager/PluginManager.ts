/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventManager } from './eventManager';
import { HTTPService } from '../services/HTTPService';

export interface Manifest {
    id: string;
    version: string;
}
export interface IClientPluginConstructor {
    new(config: any, manifest: Manifest)
}
export class PluginManager {
    private static pluginManifests: object = {};
    private static plugins: object = {};
    private static pluginInstances: object = {};
    private static errors: any = [];

    public static async registerPlugin(manifest: Manifest, config: any) {
        PluginManager.plugins[manifest.id] = { c: config, m: manifest };
        if (manifest) {
            PluginManager.pluginManifests[manifest.id] = { m: manifest };
        }
        eventManager.dispatchEvent('plugin:load', { plugin: manifest.id, version: manifest.version });
        eventManager.dispatchEvent(manifest.id + ':load');
        console.log('=====> ' + manifest.id + ' plugin loaded');
    }
    public static setPluginInstance(manifest: Manifest, plugin: any) {
        PluginManager.pluginInstances[manifest.id] = new plugin();
    }

    public static getPluginInstance(pluginId): any {
        return PluginManager.pluginInstances[pluginId];
    }
}