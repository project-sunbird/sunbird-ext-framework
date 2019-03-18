/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { ISchemaLoader, SchemaLoader } from './db';
import { Express } from 'express';
import { RouterRegistry } from './managers/RouterRegistry';
import { defaultConfig } from './config';
import { PluginManager } from './managers/pluginManager';
import { FrameworkConfig } from './interfaces';
import { PluginLoader } from './managers/PluginLoader';
import { RegistrySchema } from './meta/RegistrySchema';
import { logger, enableLogger, loggerLevels } from './logger';
import { FrameworkError, FrameworkErrors } from './util';
import { Inject, Singleton } from 'typescript-ioc';
import { ESSchemaLoader } from './db/elasticsearch/ESSchemaLoader';
import { CassandraSchemaLoader } from './db/cassandra/CassandraSchemaLoader';
import { CassandraMetaDataProvider } from './meta/CassandraMetaDataProvider';
import { TelemetryService } from './services/telemetry';
import * as TelemetryLib from '@project-sunbird/telemetry-sdk';

@Singleton
export class Framework {

  @Inject
  public routerRegistry: RouterRegistry;

  @Inject
  public pluginManager: PluginManager;

  @Inject
  public telemetryService: TelemetryService;

  @Inject
  public schemaLoader: SchemaLoader;

  public initialized = false;
  private _config: FrameworkConfig;

  public get config(): FrameworkConfig {
    return { ...this._config };
  }

  public async initialize(config: FrameworkConfig, app: Express) {
    try {
      if (!this.initialized) {
        config = Object.freeze(Object.assign({}, defaultConfig, config));
        this._config = config;

        // configure logger
        if (config.logLevel) enableLogger(config.logLevel);

        this.schemaLoader.registerLoader(new ESSchemaLoader(config.db.elasticsearch))
        this.schemaLoader.registerLoader(new CassandraSchemaLoader(config.db.cassandra))
        this.pluginManager.initialize(config);
        this.routerRegistry.initialize(app);
        this.telemetryService.initialize(config.telemetry, TelemetryLib);
        // await this.loadPluginRegistrySchema();
        this.initialized = true;
        logger.info('Framework is initialized!');

        await this.pluginManager.load(this.config);
        logger.info('All plugins are loaded!');
      }
    } catch (error) {
      logger.fatal('framework initialization FAILED due to following errors!', new FrameworkError({ code: FrameworkErrors.UNKNOWN_ERROR, message: 'error while initializing the framework', rootError: error }));
      // logger.fatal('EXITING OUT OF PROCESS DUE TO ERROR!');
      // process.exit(1);
    }
  }

  public async loadPluginRegistrySchema() {
    try {
      let schemaLoader: ISchemaLoader = this.schemaLoader.getLoader(RegistrySchema.type);
      await schemaLoader.create(RegistrySchema.keyspace_prefix, RegistrySchema);
      logger.info('loading registry schema');
    } catch (error) {
      logger.fatal('failed to load registry schema', error);
      throw error;
    }
  }
}
export * from './api';
export * from './interfaces';
export * from './models';
export * from './services';
export * from './util';


