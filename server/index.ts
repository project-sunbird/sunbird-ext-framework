/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { db } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';
import {RouterRegistry} from './managers/RouterRegistry';
import * as defaultConfig from './config.json';
import { PluginManager } from './managers/pluginManager';

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

	get db(): db {
		return this._db;
	}

	get api(): FrameworkAPI {
		return this._api;
	}

	static initialize(config: any, cb: (...args: any[]) => void, app?: Express) : Framework {

		if(!Framework._initialized) {
			Framework._instance = new Framework(config, cb, app);
			PluginManager.loadPlugin(config.plugins[0]).then(() => {
				console.log(' ===> Plugins Loaded!');
				cb();
			});
			console.log(' ===> Loading plugins .... ');
		}
		return Framework._instance;
		
	}

}
