/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { Db, ISchemaLoader, SchemaLoader } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';
import { RouterRegistry } from './managers/RouterRegistry';
import { defaultConfig } from './config';
import { PluginManager } from './managers/PluginManager';
import { FrameworkConfig } from './interfaces';
import { Manifest } from './models/Manifest';
import { PluginLoader } from './managers/PluginLoader';
import { RegistrySchema } from './meta/RegistrySchema';
import { cassandraMetaDataProvider } from './meta/CassandraMetaDataProvider';
import { PluginRegistry } from './managers/PluginRegistry';
import * as cls from 'continuation-local-storage';
import * as Winston from 'winston'; // for transports.Console
import { logger } from './logger';
import { FrameworkError, FrameworkErrors } from './util';
export * from './interfaces';
export * from './test-framework';


export class Framework {
  private static _initialized = false;
  private static _instance: Framework;
  private static _pluginManager: PluginManager;
  private _config: FrameworkConfig;
  private _db: Db;
  private _api: FrameworkAPI;

  public get config(): FrameworkConfig {
    return this._config;
  }

  public static get instance(): Framework {
    return this._instance;
  }

  constructor(config: FrameworkConfig, app: Express) {
    this._config = config;
    this._db = new Db(config);
    this._api = new FrameworkAPI(config);
  }

  public static get Db(): Db {
    return Framework._instance._db;
  }

  public static get pluginManager(): PluginManager {
    return Framework._pluginManager;
  }

  public static get api(): FrameworkAPI {
    return Framework._instance._api;
  }

  public static async initialize(config: FrameworkConfig, app: Express) {
    try {
      if (!Framework._initialized) {
        config = Object.assign({}, defaultConfig, config);
        Framework._instance = new Framework(config, app);

        // Initialize Managers, Registry and other services 
        RouterRegistry.initialize(app);
        PluginRegistry.initialize(cassandraMetaDataProvider);
        Framework._pluginManager = new PluginManager(new PluginLoader(Framework._instance.config))

        // Load the schema for plugin registry before plugins are loaded
        await Framework.loadPluginRegistrySchema();

        // Set Framework initialized to `true` after above tasks are performed
        Framework._initialized = true;
        logger.info('Framework is initialized!');

        await Framework._pluginManager.load(Framework._instance.config);
        logger.info('All plugins are loaded!');
      }
    } catch (error) {
      logger.error('Error while initializing the framework', new FrameworkError({ code: FrameworkErrors.UNKNOWN_ERROR, message: 'error while initializing the framework', rootError: error }));
    }
  }

  public static async loadPluginRegistrySchema() {
    try {
      let schemaLoader: ISchemaLoader = SchemaLoader.getLoader(RegistrySchema.type);
      await schemaLoader.create(RegistrySchema.keyspace_prefix, RegistrySchema);
      logger.info('loading registry schema');
    } catch (error) {
      logger.error('failed to load registry schema', error);
    }
  }
}

