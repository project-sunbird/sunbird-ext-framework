/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { db, ISchemaLoader, SchemaLoader } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';
import { RouterRegistry } from './managers/RouterRegistry';
import { defaultConfig } from './config';
import { PluginManager } from './managers/PluginManager';
import { FrameworkConfig } from './interfaces';
import {Manifest} from './models/Manifest';
import { PluginLoader } from './managers/PluginLoader';
import {RegistrySchema} from './meta/RegistrySchema';

export * from './interfaces';
export * from './test-framework';

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
		RouterRegistry.initialize(app, this._config.secureContextParams);
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
			await Framework.laodPluginRegistrySchema();
			PluginManager.initialize(new PluginLoader(Framework._instance.config))
			await PluginManager.load(Framework._instance.config);
			console.log('=====> Plugins load complete. ');
		}
	}

	public static async laodPluginRegistrySchema() {
		try {
			let schemaLoader = <ISchemaLoader>SchemaLoader.getLoader(RegistrySchema.type);
			await schemaLoader.create(RegistrySchema.db, RegistrySchema);
		} catch(e) {
			console.log(e);
		}
	}
}

