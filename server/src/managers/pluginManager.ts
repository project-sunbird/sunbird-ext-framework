/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { RouterRegistry } from './RouterRegistry'
import { Manifest, IPluginManifest } from '../models/Manifest'
import { IRouterConstructor, IServerConstructor, IPlugin, FrameworkConfig } from '../interfaces';
import { PluginLoader } from './PluginLoader';
import { FrameworkError } from '../util';

export class PluginManager {
	private pluginLoader: PluginLoader;

	constructor(pluginLoader: PluginLoader) {
		this.pluginLoader = pluginLoader;
	}

	public async load(config: FrameworkConfig) {
		for (let plugin of config.plugins) {
			await this.loadPlugin(plugin);
		}
	}

	public getPluginInstance(pluginId: string) : any {
		return this.pluginLoader.getPluginInstance(pluginId);
	}

	public async loadPlugin(plugin: IPlugin) {
		try {
			await this.pluginLoader.loadPlugin(plugin);
			console.log('=====> ' + plugin.id + ' plugin loaded');
		} catch (e) {
			if(e instanceof FrameworkError) {
				console.log('=====> ' + plugin.id + ' plugin load failed due to ' + (e as FrameworkError).stack);
			}
			throw e;	
		}
	}
}