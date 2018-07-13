import { IMetaDataProvider, PluginMeta, ICassandraConfig } from "../interfaces";
import { CassandraDB } from "../db/cassandra";
import { Util, delayPromise, FrameworkError, FrameworkErrors } from "../util";
import { RegistrySchema } from "./RegistrySchema";
import * as _ from 'lodash';
import { logger } from '../logger';
import { Inject, Singleton } from "typescript-ioc";

@Singleton
export class CassandraMetaDataProvider implements IMetaDataProvider {
  private connection: any;

  @Inject
  private cassandraDB: CassandraDB;

  public initialize(config: ICassandraConfig) {
    config = Object.assign({}, config, { keyspace: Util.generateId(RegistrySchema.keyspace_prefix, RegistrySchema.keyspace_name) })
    this.cassandraDB.initialize(config);
  }

  public async getMeta(id: string): Promise<any> {
    const model = await this.getConnection();
    await model.instance.plugin_registry.findAsync({ id })
      .catch(error => {
        logger.error('error when getting meta data', error)
      })
  }

  public async updateMeta(id: string, meta: PluginMeta): Promise<any> {
    const model = await this.getConnection();
    await model.instance.plugin_registry.updateAsync({ id }, { ...meta })
      .catch(error => {
        logger.error('error when updating meta data', error)
      })
  }

  public async createMeta(meta: PluginMeta): Promise<any> {
    const model = await this.getConnection();
    const record = new model.instance.plugin_registry({ ...meta });
    await record.saveAsync()
      .catch(error => {
        logger.error('error when creating meta data', error)
      });
  }

  public async deleteMeta(id: string): Promise<any> {
    const model = await this.getConnection();
    await model.instance.plugin_registry.deleteAsync({ id: id })
      .catch(error => {
        logger.error('error when deleting meta data', error)
      })
  }

  private async getConnection() {
    if (this.connection) return this.connection;
    this.connection = await this.cassandraDB.getConnectionByKeyspace(Util.generateId(RegistrySchema.keyspace_prefix, RegistrySchema.keyspace_name));
    return this.connection
  }
}