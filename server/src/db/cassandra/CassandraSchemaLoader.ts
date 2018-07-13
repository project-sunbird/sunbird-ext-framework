/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { SchemaLoader } from '../SchemaLoader'
import { CassandraDB } from './index';
import { ICassandraConfig, IMetaDataProvider } from '../../interfaces';
import { Util, FrameworkError, FrameworkErrors, delayPromise } from '../../util';
import * as _ from 'lodash';
import * as ExpressCassandra from 'express-cassandra';
import { SchemaService } from './schemaService';
import * as util from 'util';
import { CassandraMetaDataProvider } from '../../meta/CassandraMetaDataProvider';
import { logger } from '../../logger';
import { Inject, Singleton } from 'typescript-ioc';
@Singleton
export class CassandraSchemaLoader implements ISchemaLoader {

  private _config: ICassandraConfig;
  private dbConnection: any;

  @Inject
  private metaDataProvider: CassandraMetaDataProvider;

  @Inject
  private schemaService: SchemaService;

  @Inject
  private cassandraDB: CassandraDB

  constructor(config: ICassandraConfig) {
    this._config = config;
    this.cassandraDB.initialize(config)
  }

  getType(): string {
    return 'cassandra';
  }

  public async exists(pluginId: string, schema: object) {
    // TODO: complete implementation
  }

  public async alter(pluginId: string, schema: object) {
    // TODO: complete implementation
  }

  public async migrate(pluginId: string, schema: object) {
    // TODO: complete implementation
  }

  public async create(pluginId: string, schema: any) {
    logger.info('loading schema for plugin: ', pluginId);
    this.validateSchema(schema);
    const keyspaceName = Util.generateId(pluginId, schema.keyspace_name);
    this.schemaService.setSchema(pluginId, Object.assign({}, schema, { keyspace_name: keyspaceName }));
    if (!schema.private) await this.metaDataProvider.updateMeta(pluginId, { cassandra_keyspace: keyspaceName });
    this.dbConnection = await this.cassandraDB.getConnectionByKeyspace(keyspaceName, schema.config);
    for (const table of schema.column_families) {
      const model = this.dbConnection.loadSchema(table.table_name, table);
      const syncDBAsync = util.promisify(model.syncDB.bind(model))
      await syncDBAsync()
        .then((result) => {
          if (result) {
            logger.info(`cassandra schema updated successfully for "${pluginId}"`);
          } else {
            logger.info(`no Cassandra schema change detected for plugin "${pluginId}"!`);
          }
        })
        .catch((err) => {
          if (err) throw new FrameworkError({ message: `"${pluginId}" : unable to sync database model with cassandra`, code: FrameworkErrors.DB_ERROR });
        })
    };
  }

  private validateSchema(schema) {
    if (!schema.column_families || !Array.isArray(schema.column_families)) {
      throw new FrameworkError({ message: 'invalid cassandra schema! "column_families" not defined!', code: FrameworkErrors.DB_ERROR });
    }

    if (!schema.keyspace_name) {
      throw new FrameworkError({ message: 'invalid cassandra schema! "keyspace_name" not defined!', code: FrameworkErrors.DB_ERROR });
    }
  }
}