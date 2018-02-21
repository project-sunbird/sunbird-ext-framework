import {RouterRegistry} from './RouterRegistry'
import {Manifest} from '../models/Manifest'
import {ExtPlugin} from '../models/Plugin'
import { IRouterConstructor } from '../interfaces';
 

export class PluginManager {
	private static instance: PluginManager;
	private static _pluginInstances: Array<any> = [];
	private readonly pluginClassName = 'ExtPlugin';
	private readonly pluginFilePath = 'server/plugin.js';
	
	public static async load(config: any) {
		for(let plugin of config.plugins) {
			await PluginManager.loadPlugin(plugin);
		}
	}

	public static getPluginManifest(pluginId: string): Manifest {
		return PluginManager._pluginInstances.find((plugin) => {
			return plugin.id === pluginId;
		});
	}

	public static async loadPlugin(plugin: any) {
		try {
			const pluginManifest = await import(plugin.id + '/manifest.json');
			const manifest = Manifest.fromJSON(JSON.stringify(pluginManifest));

			let pluginFile = await import(plugin.id + '/dist/plugin.js');
			let pluginClass = pluginFile.ExtPlugin;
			let pluginInstance = new pluginClass();
			pluginInstance.onLoad();

			PluginManager._pluginInstances.push({ id: plugin.id, manifest, class: pluginClass});
			let router = RouterRegistry.getRouter(manifest);
			let pluginRouter = await import(plugin.id + '/dist/routes.js');
			pluginRouter = <IRouterConstructor>pluginRouter.Router;
			const routerInstance = new pluginRouter();
			routerInstance.init(router, {}, manifest);

			
		} catch(e) {
			console.log(e);
		}
	}
}