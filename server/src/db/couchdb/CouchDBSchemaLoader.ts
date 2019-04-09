/**
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { ICouchDBConfig } from '../../interfaces';
import { Util, FrameworkError, FrameworkErrors, delayPromise } from '../../util';
import * as _ from 'lodash';
import { SchemaService } from './schemaService';
import { logger } from '../../logger';
import { Inject, Singleton } from 'typescript-ioc';
import { CouchDB } from '.';
@Singleton
export class CouchDBSchemaLoader implements ISchemaLoader {

    private _config: ICouchDBConfig;
    private dbConnection: any;

    @Inject
    private schemaService: SchemaService;

    @Inject
    private couchDB: CouchDB

    constructor(config: ICouchDBConfig) {
        this._config = config;
        this.couchDB.initialize(config);
    }

    getType(): string {
        return 'couchdb';
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



        this.dbConnection = this.couchDB.getConnection(pluginId);

        // setSchema
        this.schemaService.setSchema(pluginId, Object.assign({}, schema));

        _.forEach(schema.databases, (db) => {
            const databaseName = Util.generateId(pluginId, db.name);
            db.database_name = databaseName;
        })
        let dbsList = await this.dbConnection.db.list();
        // create databases 

        for (const db of schema.databases) {
            if (!_.includes(dbsList, db.database_name)) {
                await this.dbConnection.db.create(db.database_name).catch((err) => {
                    if (err) throw new FrameworkError({ message: `"${pluginId}" : unable to create database ${db.name} `, code: FrameworkErrors.DB_ERROR });
                });
            } else {
                logger.warn(`${db.name} database in couchdb is already exists so ignoring`)
            }
        }

        // create views for each database
        for (const db of schema.databases) {
            let dbInstance = this.dbConnection.db.use(db.name)
            if (!_.isEmpty(db['views'])) {
                for (let view of db.views) {
                    await dbInstance.insert(view).catch((err) => {
                        if (err) throw new FrameworkError({ message: `"${pluginId}" : unable to create view ${JSON.stringify(view)} for ${db.name} `, code: FrameworkErrors.DB_ERROR });
                    });
                }
            }
        }

        // create indexes for each database
        for (const db of schema.databases) {
            let dbInstance = this.dbConnection.db.use(db.name)
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