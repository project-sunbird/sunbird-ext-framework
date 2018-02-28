import { PluginManager, Manifest } from './PluginManager';
import * as _ from 'lodash';
export interface FrameworkConfig {
    pluginBasePath: string;
}
export class PluginLoader {
    private _config: FrameworkConfig;
    constructor(config: FrameworkConfig) {
        this._config = _.cloneDeep(config);
    }
    get config(): FrameworkConfig {
        return this._config;
    }
    public async instantiatePlugin(manifest: Manifest) {
        try {
            let pluginFile = await import(this.config.pluginBasePath + manifest.id + '/');
            let pluginClass = pluginFile.Server;
            let pluginInstance = new pluginClass(this.config, manifest);
            PluginManager.pluginInstances[manifest.id] = pluginInstance;
        } catch (err) {

        }
    }
} 