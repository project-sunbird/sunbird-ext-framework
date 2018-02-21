/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { db } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';
import {RouterRegistry} from './managers/RouterRegistry';
import * as defaultConfig from './config.json';
import { PluginManager } from './managers/pluginManager';

export * from './interfaces'

export class Framework {

	private _config: object;
	private _db: db;
	private _api: FrameworkAPI;
	private static _initialized = false;
	private static _instance: Framework;

	constructor(config: object, cb: (...args: any[]) => void, app: Express) {
		this._config = {defaultConfig, config};
		this._db = new db(config);
		this._api = new FrameworkAPI(config);
		RouterRegistry.initialize(app);
		// 1. create plugin_registry table
		//		PluginRegistry.initialize();
		// 2. load plugins
		//		PluginManager.load()
		console.log('=====> Framework initialized!');
	}

	public static db(): db {
		console.log('Framework._instance', Framework._instance);
		return Framework._instance._db;
	}

	public static api(): FrameworkAPI {
		return Framework._instance._api;
	}

	public static initialize(config: any, cb: (...args: any[]) => void, app?: Express) : Framework {

		if(!Framework._initialized) {
			Framework._instance = new Framework(config, cb, app);
			Framework._initialized = true;

			config.plugins.forEach((plugin) => {
				PluginManager.loadPlugin(plugin).then(() => {
					console.log(' ===> Plugins Loaded!');
					cb();
				});
			})
			console.log(' ===> Loading plugins .... ');
		}
		return Framework._instance;
	}
}
