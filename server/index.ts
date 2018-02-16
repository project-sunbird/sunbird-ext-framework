import {db} from './db';
import {FrameworkAPI} from './api';
import { Application } from 'express';

export class Framework {

	private _db: db;
	private _api: FrameworkAPI;

	constructor(config: object, app?: Application) {
		this._db = new db(config);
		this._api = new FrameworkAPI(config);

		// 1. create plugin_registry table
		//		PluginRegistry.initialize();
		// 2. load plugins
		//		PluginManager.load()
	}

	get db(): db {
		return this._db;
	}

	get api(): FrameworkAPI {
		return this._api;
	}
}