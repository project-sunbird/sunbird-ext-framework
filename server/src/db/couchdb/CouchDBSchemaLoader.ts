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
        // create databases 
        _.forEach(schema.databases, async (db) => {

            await this.dbConnection.db.list()
                .then((dbsList) => {
                    if (!_.includes(dbsList, db.database_name)) {
                        return this.dbConnection.db.create(db.database_name);
                    } else {
                        return Promise.reject('database already exists')
                    }
                }).then(() => {
                    let viewPromises = [];
                    let dbInstance = this.dbConnection.db.use(db.database_name)
                    _.forEach(db.views, (view) => {
                        viewPromises.push(dbInstance.insert(view))
                    })
                    return Promise.all(viewPromises);
                }).then(() => {
                    let indexPromises = [];
                    let dbInstance = this.dbConnection.db.use(db.database_name)
                    _.forEach(db.indexes, (index) => {
                        indexPromises.push(dbInstance.createIndex(index))
                    })
                    return Promise.all(indexPromises);
                }).catch((err) => {
                    if (err) throw new FrameworkError({ message: `"${pluginId}" : unable to create database`, code: FrameworkErrors.DB_ERROR });
                })
        })

    }
}