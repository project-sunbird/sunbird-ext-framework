import { PluginManager, Manifest } from './PluginManager';

export interface FrameworkConfig {
    pluginBasePath: string;
}

export interface IClientPluginConstructor {
    new(config: any, manifest: Manifest)
}

export class PluginLoader {
    private _config: FrameworkConfig;
    constructor(config: FrameworkConfig) {
        this._config = { ...config };
    }

    public async instantiatePlugin(manifest: Manifest) {
        try {
            let pluginFile = await import(this._config.pluginBasePath + manifest.id + '/Client');
            let pluginClass = <IClientPluginConstructor>pluginFile.ClientPlugin;
            let pluginInstance = new pluginClass(this._config, manifest);
            PluginManager.pluginInstances[manifest.id] = pluginInstance;
        } catch (err) {

        }
    }
} 