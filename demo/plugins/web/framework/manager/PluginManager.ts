/**
 * @author Rajeev Sathish <rajeev.sathish@tarento.com>
 */
import { eventManager } from './eventManager';
import * as _ from 'lodash';
export interface Manifest {
    id: string,
    ver: string,
    statePath: string
}
export class PluginManger {
    pluginManifests: object = {};
    plugins: object = {};
    pluginObjs: object = {};
    pluginInstances: object = {};
    errors: any = [];
    public registerPlugin(manifest: Manifest, plugin: any) {
        this._registerPlugin(manifest.id, manifest.ver, plugin, manifest);
    }
    public _registerPlugin(pluginId: string, pluginVer: string, plugin: any, manifest: Manifest) {
        this.plugins[pluginId] = { p: plugin, m: manifest };
        if (manifest) {
            this.pluginManifests[manifest.id] = { m: manifest };
        }
        eventManager.dispatchEvent('plugin:load', { plugin: pluginId, version: pluginVer });
        eventManager.dispatchEvent(pluginId + ':load');
        let p = new plugin(manifest);
        if (manifest) {
            this.pluginObjs[manifest.id] = p;
        }
    }
    public checkForDuplicateState(pluginId: string, pluginVer: string, plugin: any, manifest: Manifest) {
        if (manifest.statePath) {
            //TODO check for Duplicate path/state 
        }
    }
}