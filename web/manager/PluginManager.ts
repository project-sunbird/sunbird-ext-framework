/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventManager } from './eventManager';
import { PluginLoader } from './PluginLoader';
import * as _ from 'lodash';

export interface Manifest {
    id: string,
    ver: string,
    statePath: string,
    pluginFolderName: string,
}
export class PluginManager {
    static pluginManifests: object = {};
    static plugins: object = {};
    //static pluginObjs: object = {};
    static pluginInstances: object = {};
    static errors: any = [];
    public static registerPlugin(manifest: Manifest, config: any) {
        PluginManager._registerPlugin(manifest.id, manifest.ver, config, manifest);
    }
    public static async _registerPlugin(pluginId: string, pluginVer: string, config: any, manifest: Manifest) {
        PluginManager.plugins[pluginId] = { c: config, m: manifest };
        if (manifest) {
            PluginManager.pluginManifests[manifest.id] = { m: manifest };
        }
        eventManager.dispatchEvent('plugin:load', { plugin: pluginId, version: pluginVer });
        eventManager.dispatchEvent(pluginId + ':load');
        let pluginLoader = new PluginLoader(config);
        await pluginLoader.instantiatePlugin(manifest);
        console.log('=====> ' + pluginId + ' plugin loaded');
        // let p = new plugin(manifest);
        // if (manifest) {
        //     PluginManager.pluginInstances[manifest.id] = p;
        // }
    }
    public checkForDuplicateState(pluginId: string, pluginVer: string, plugin: any, manifest: Manifest) {
        if (manifest.statePath) {
            //TODO check for Duplicate path/state 
        }
    }
    public static getPluginInstance(pluginId): object {
        return PluginManager.pluginInstances[pluginId];
    }
}