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
	private readonly pluginClassName = 'ExtPlugin';
	private readonly pluginFilePath = 'server/plugin.js';

	public static get instances() : any {
		return this._pluginInstances;
	}

	public static async load(config: FrameworkConfig) {
		for (let plugin of config.plugins) {
			await PluginManager.loadPlugin(plugin, config);
			console.log('=====> ' + plugin.id + ' plugin loaded');
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
		} catch (e) {
			if(e instanceof FrameworkError) {
				console.error('=====> ' + (<FrameworkError> e).print());
			}
			
		}
	}
}