/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { RouterRegistry } from './RouterRegistry'
import { Manifest, IPluginManifest } from '../models/Manifest'
import { IRouterConstructor, IServerConstructor, IPlugin, FrameworkConfig } from '../interfaces';
import { PluginLoader } from './PluginLoader';
import { FrameworkError } from '../util';

export class PluginManager {
	private static instance: PluginManager;
	private static _pluginInstances: any = {};
	private static pluginLoader: PluginLoader;

	public static get instances() : any {
		return this._pluginInstances;
	}

	public static initialize(pluginLoader: PluginLoader) {
		PluginManager.pluginLoader = pluginLoader;
	}

	public static async load(config: FrameworkConfig) {
		for (let plugin of config.plugins) {
			await PluginManager.loadPlugin(plugin);
		}
	}

	public static getPluginManifest(pluginId: string): Manifest {
		return PluginManager._pluginInstances.find((plugin) => {
			return plugin.id === pluginId;
		});
	}

	public static getPluginInstance(pluginId: string) : any {
		return PluginManager._pluginInstances[pluginId];
	}

	public static async loadPlugin(plugin: IPlugin) {
		try {
			await PluginManager.pluginLoader.loadPlugin(plugin);
			console.log('=====> ' + plugin.id + ' plugin loaded');
		} catch (e) {
			if(e instanceof FrameworkError) {
				console.log('=====> ' + plugin.id + ' plugin load failed due to ' + (<FrameworkError> e).print());
			}
			throw e;	
		}
	}
}