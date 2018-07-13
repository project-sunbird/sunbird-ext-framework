/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { FrameworkConfig, IElasticSearchConnector } from "../interfaces";
import { CassandraDB, ElasticSearchDB } from "../db";
import { RouterRegistry } from "../managers/RouterRegistry";
import { Framework } from "../index";
import { Inject, Singleton } from "typescript-ioc";
import { Express } from 'express';

export * from '../interfaces';

@Singleton
export class FrameworkAPI {
  private config: FrameworkConfig;

  @Inject
  private framework: Framework;

  @Inject
  private cassandraDB: CassandraDB;

  @Inject
  private elasticSearchDB: ElasticSearchDB;

  public async bootstrap(config: FrameworkConfig, app: Express) {
    this.config = { ...config }
    this.elasticSearchDB.initialize(this.config.db.elasticsearch);
    this.cassandraDB.initialize(this.config.db.cassandra);
    await this.framework.initialize(config, app);
  }

  public getCassandraInstance(pluginId: string) {
    return this.cassandraDB.getConnectionByPlugin(pluginId);
  }

  public getElasticsearchInstance(pluginId: string): IElasticSearchConnector {
    return this.elasticSearchDB.getConnection(pluginId);
  }

  public threadLocal() {
    return this.framework.routerRegistry.getThreadNamespace();
  }

  public getPluginInstance(id: string) {
    return this.framework.pluginManager.getPluginInstance(id);
  }
}

export const frameworkAPI = new FrameworkAPI();