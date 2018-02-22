/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { db } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';
import { RouterRegistry } from './managers/RouterRegistry';
import { defaultConfig } from './config';
import { PluginManager } from './managers/PluginManager';
import { FrameworkConfig } from './interfaces';

export * from './interfaces'

export class Framework {

	private _config: FrameworkConfig;
	private _db: db;
	private _api: FrameworkAPI;
	private static _initialized = false;
	private static _instance: Framework;

	public get config(): FrameworkConfig {
		return this._config;
	}

	public static get instance(): Framework {
		return this._instance;
	}

	constructor(config: FrameworkConfig, app: Express) {
		this._config = Object.assign(defaultConfig, config);
		this._db = new db(config);
		this._api = new FrameworkAPI(config);
		RouterRegistry.initialize(app);
		console.log('=====> Framework initialized!');
	}

	public static get db(): db {
		return Framework._instance._db;
	}

	public static get api(): FrameworkAPI {
		return Framework._instance._api;
	}

	public static async initialize(config: FrameworkConfig, app: Express) {

		if (!Framework._initialized) {
			Framework._instance = new Framework(config, app);
			Framework._initialized = true;
			await PluginManager.load(Framework._instance.config);
			console.log('=====> Plugins Loaded!');
		}
	}
}
