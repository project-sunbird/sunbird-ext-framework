import { db } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';

export class Framework {

	private _db: db;
	private _api: FrameworkAPI;
	private static _initialized = false;
	private static _instance: Framework;

	constructor(config: object, cb: (...args: any[]) => void, app?: Express) {
		this._db = new db(config);
		this._api = new FrameworkAPI(config);

		// 1. create plugin_registry table
		//		PluginRegistry.initialize();
		// 2. load plugins
		//		PluginManager.load()
		cb();
	}

	get db(): db {
		return this._db;
	}

	get api(): FrameworkAPI {
		return this._api;
	}

	static initialize(config: object, cb: (...args: any[]) => void, app?: Express) : Framework {

		if(!Framework._initialized) {
			Framework._instance = new Framework(config, cb, app);
			console.log('Framework initialized!');
		}
		return Framework._instance;
		
	}

}
