/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { FrameworkConfig, IElasticSearchConnector } from "../interfaces";
import { CassandraDB, ElasticSearchDB, CouchDB, PouchDB } from "../db";
import { RouterRegistry } from "../managers/RouterRegistry";
import { Framework } from "../index";
import { Inject, Singleton } from "typescript-ioc";
import { Express } from 'express';
import { TelemetryService } from '../services'
export * from '../services/telemetry/interfaces/TelemetryService';
export * from '../interfaces';
import { logger } from '../logger';

@Singleton
export class FrameworkAPI {
  private config: FrameworkConfig;

  @Inject
  private framework: Framework;

  @Inject
  private cassandraDB: CassandraDB;

  @Inject
  private elasticSearchDB: ElasticSearchDB;

  @Inject
  private _telemetryService: TelemetryService;

  @Inject
  private couchDB: CouchDB;

  @Inject
  private pouchDB: PouchDB;

  @Inject
  private routerRegistry: RouterRegistry;

  public async bootstrap(config: FrameworkConfig, app: Express) {
    this.config = { ...config }
    this.elasticSearchDB.initialize(this.config.db.elasticsearch);
    this.cassandraDB.initialize(this.config.db.cassandra);
    this.couchDB.initialize(this.config.db.couchdb);
    this.pouchDB.initialize(this.config.db.pouchdb)
    await this.framework.initialize(config, app);
  }

  closeCassandraConnections() {
    return this.cassandraDB.closeCassandraConnections();
  }

  public getCassandraInstance(pluginId: string) {
    return this.cassandraDB.getConnectionByPlugin(pluginId);
  }

  public getElasticsearchInstance(pluginId: string): IElasticSearchConnector {
    return this.elasticSearchDB.getConnection(pluginId);
  }

  public telemetryService(): TelemetryService {
    return this._telemetryService
  }

  public threadLocal() {
    return this.framework.routerRegistry.getThreadNamespace();
  }

  public getPluginInstance(id: string) {
    return this.framework.pluginManager.getPluginInstance(id);
  }

  public getCouchDBInstance(pluginId: string) {
    return this.couchDB.getConnection(pluginId);
  }

  public registerStaticRoute(path: string, prefix?: string) {
    this.routerRegistry.registerStaticRoute(path, prefix);
  }

  public setStaticViewEngine(name: string) {
    this.routerRegistry.setStaticViewEngine(name);
  }


  public getPouchDBInstance(pluginId: string, dbName: string) {
    return this.pouchDB.getConnection(pluginId, dbName);
  }
}

export const frameworkAPI = new FrameworkAPI();