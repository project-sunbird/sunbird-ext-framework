import { IMetaDataProvider, PluginMeta, ICassandraConfig } from "../interfaces";
import { CassandraDB } from "../db/cassandra";
import { defaultConfig } from "../config";
import { Util, delayPromise, FrameworkError, FrameworkErrors } from "../util";
import { RegistrySchema } from "./RegistrySchema";
import * as _ from 'lodash';
import { logger } from '../logger';

export class CassandraMetaDataProvider implements IMetaDataProvider {
  private connection: any;
  private cassandraDB: CassandraDB;

  constructor(cassandraDB: CassandraDB) {
    this.cassandraDB = cassandraDB;
  }

  public async getMeta(id: string) {
    const model = await this.getConnection();
    await model.instance.plugin_registry.findAsync({id})
    .catch(error => {
      logger.error('error when getting meta data', error)
    })
  }

  public async updateMeta(id: string, meta: PluginMeta) {
    const model = await this.getConnection();
    await model.instance.plugin_registry.updateAsync({id}, {...meta})
    .catch(error => {
      logger.error('error when updating meta data', error)
    })
  }

  public async createMeta(meta: PluginMeta) {
    const model = await this.getConnection();
    const record = new model.instance.plugin_registry({ ...meta });
    await record.saveAsync()
    .catch(error => {
      logger.error('error when creating meta data', error)
    });
  }

  public async deleteMeta(id: string) {
    const model = await this.getConnection();
    await model.instance.plugin_registry.deleteAsync({id: id})
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


let cassandraConfig: ICassandraConfig = {
  contactPoints: defaultConfig.db.cassandra.contactPoints,
  keyspace: Util.generateId(RegistrySchema.keyspace_prefix, RegistrySchema.keyspace_name)
}
let cassandraInstance = new CassandraDB(cassandraConfig)
export const cassandraMetaDataProvider = new CassandraMetaDataProvider(cassandraInstance);