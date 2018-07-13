/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { RouterRegistry } from './RouterRegistry'
import { Manifest, IPluginManifest } from '../models/Manifest'
import { IRouterConstructor, IServerConstructor, IPlugin, FrameworkConfig } from '../interfaces';
import { PluginLoader } from './PluginLoader';
import { FrameworkError } from '../util';
import { logger } from '../logger';
import { Inject, Singleton } from 'typescript-ioc';
import * as _ from 'lodash';

@Singleton
export class PluginManager {
  @Inject
	public pluginLoader: PluginLoader;
  private _config: any;

  public initialize(config: FrameworkConfig) {
    this._config = _.cloneDeep(config);
    this.pluginLoader.initialize(config);
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
			(e instanceof FrameworkError) && logger.fatal(`plugin "${plugin.id}" load failed due to ` + (e as FrameworkError).stack);
			throw e;	
		}
	}
}