/**
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { IPouchDBConfig } from '../../interfaces';
import { Util, FrameworkError, FrameworkErrors, delayPromise } from '../../util';
import * as _ from 'lodash';
import { SchemaService } from './schemaService';
import { logger } from '../../logger';
import { Inject, Singleton } from 'typescript-ioc';
import { PouchDB } from '.';
@Singleton
export class PouchDBSchemaLoader implements ISchemaLoader {

  private _config: IPouchDBConfig;
  private dbConnection: any;

  @Inject
  private schemaService: SchemaService;

  @Inject
  private pouchDB: PouchDB

  constructor(config: IPouchDBConfig) {
    this._config = config;
    this.pouchDB.initialize(config);
  }

  getType(): string {
    return 'pouchdb';
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


    // setSchema
    this.schemaService.setSchema(pluginId, Object.assign({}, schema));

    _.forEach(schema.databases, (db) => {
      const databaseName = Util.generateId(pluginId, db.name);
      db.database_name = databaseName;
    })

    // create databases 

    for (const db of schema.databases) {
      this.dbConnection = this.pouchDB.getConnection(pluginId, db.name);
    }

    // create indexes for each database
    for (const db of schema.databases) {
      let dbInstance = this.pouchDB.getConnection(pluginId, db.name);
      if (!_.isEmpty(db['indexes'])) {
        for (let index of db.indexes) {
          await dbInstance.createIndex(index).catch((err) => {
            if (err) throw new FrameworkError({ message: `"${pluginId}" : unable to create index ${JSON.stringify(index)} for ${db.name} `, code: FrameworkErrors.DB_ERROR });
          });
        }
      }
    }

  }
}