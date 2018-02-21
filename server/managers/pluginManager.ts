import {RouterRegistry} from './RouterRegistry'
import {Manifest} from '../models/Manifest'
import {ExtPlugin} from '../models/Plugin'
import { IRouterConstructor } from '../interfaces';
 

export class PluginManager {
	private static instance: PluginManager;
	private _pluginInstances: Array<ExtPlugin>;
	private readonly pluginClassName = 'ExtPlugin';
	private readonly pluginFilePath = 'server/plugin.js';
	
	public static async load(config: any) {
		for(let plugin of config.plugins) {
			await PluginManager.loadPlugin(plugin);
		}
	}

	public static async loadPlugin(plugin: any) {
		const pluginManifest = await import(plugin.id + '/server/manifest.json')
		const manifest = Manifest.fromJSON(JSON.stringify(pluginManifest))
		let router = RouterRegistry.getRouter(manifest);
		let pluginRouter = <IRouterConstructor> await import(plugin.id + '/server/routes');
		const routerInstance = new pluginRouter();
		routerInstance.init(router, {}, manifest);
	}

}