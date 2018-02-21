import { RouterRegistry } from './RouterRegistry'
import { Manifest, IPluginManifest } from '../models/Manifest'
import { ExtPlugin } from '../models/Plugin'
import { IRouterConstructor } from '../interfaces';

export class PluginManager {
	private static instance: PluginManager;
	private static _pluginInstances: Array<any> = [];
	private readonly pluginClassName = 'ExtPlugin';
	private readonly pluginFilePath = 'server/plugin.js';

	public static async load(config: any) {
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

	public static async loadPlugin(plugin: any, config: any) {

		try {
			const pluginManifest = await import(config.pluginBasePath + plugin.id + '/manifest');
			const manifest = Manifest.fromJSON(<IPluginManifest> pluginManifest.manifest);
			/*
			let pluginFile = await import(plugin.id + '/server');
			let pluginClass = pluginFile.ExtPlugin;
			let pluginInstance = new pluginClass();
			pluginInstance.onLoad();
			PluginManager._pluginInstances.push({ id: plugin.id, manifest, class: pluginClass });
			*/
			
			let router = RouterRegistry.getRouter(manifest);
			let pluginRouter = await import(config.pluginBasePath + plugin.id + '/routes');
			pluginRouter = <IRouterConstructor>pluginRouter.Router;
			const routerInstance = new pluginRouter();
			routerInstance.init(router, {}, manifest);


		} catch (e) {
			console.log(e);
		}
	}
}