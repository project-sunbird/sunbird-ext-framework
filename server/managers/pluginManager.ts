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

	public static get instances() : any {
		return this._pluginInstances;
	}

	public static async load(config: FrameworkConfig) {
		for (let plugin of config.plugins) {
			await PluginManager.loadPlugin(plugin, config);
		}
	}

	public static getPluginManifest(pluginId: string): Manifest {
		return PluginManager._pluginInstances.find((plugin) => {
			return plugin.id === pluginId;
		});
	}

	public static getPlugin(pluginId: string) : any {
		return PluginManager._pluginInstances[pluginId];
	}

	public static async loadPlugin(plugin: IPlugin, config: FrameworkConfig) {
		try {
			let pluginLoader = new PluginLoader(config);
			await pluginLoader.loadPlugin(plugin);
			console.log('=====> ' + plugin.id + ' plugin loaded');
		} catch (e) {
			if(e instanceof FrameworkError) {
				console.error('=====> ' + plugin.id + ' plugin load failed due to ' + (<FrameworkError> e).print());
			}	
		}
	}
}