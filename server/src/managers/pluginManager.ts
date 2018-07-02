/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { RouterRegistry } from './RouterRegistry'
import { Manifest, IPluginManifest } from '../models/Manifest'
import { IRouterConstructor, IServerConstructor, IPlugin, FrameworkConfig } from '../interfaces';
import { PluginLoader } from './PluginLoader';
import { FrameworkError } from '../util';
import { logger } from '../logger';

export class PluginManager {
	private pluginLoader: PluginLoader;

	constructor(pluginLoader: PluginLoader) {
		this.pluginLoader = pluginLoader;
	}

	public async load(config: FrameworkConfig) {
		for (let plugin of config.plugins) {
      logger.info(`--------loding-plugin-${plugin.id}-------`);
			await this.loadPlugin(plugin).then(_ => {
        logger.info(`--------load-complete-${plugin.id}-------`);
      });
		}
	}

	public getPluginInstance(pluginId: string) : any {
		return this.pluginLoader.getPluginInstance(pluginId);
	}

	public async loadPlugin(plugin: IPlugin) {
		try {
			await this.pluginLoader.loadPlugin(plugin);
		} catch (e) {
			(e instanceof FrameworkError) && logger.error(`plugin "${plugin.id}" load failed due to ` + (e as FrameworkError).stack);
			throw e;	
		}
	}
}