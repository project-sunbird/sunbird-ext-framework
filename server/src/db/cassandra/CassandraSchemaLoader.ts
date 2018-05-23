/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { SchemaLoader } from '../SchemaLoader'
import { defaultConfig } from '../../config';
import { CassandraDB } from './index';
import { ICassandraConfig, ICassandraConnector } from '../../interfaces';
import { CassandraQueryBuilder } from './CassandraQueryBuilder';
import { Util, FrameworkError, FrameworkErrors, delayPromise } from '../../util';
import * as _ from 'lodash';

export class CassandraSchemaLoader implements ISchemaLoader {

	private _config: ICassandraConfig;
	private cassandraDB: CassandraDB;
	private dbConnection: ICassandraConnector;
	private queryBuilder: CassandraQueryBuilder;
	
	constructor(config: ICassandraConfig) {
		this._config = config;
		this.cassandraDB = new CassandraDB(config);
		this.queryBuilder = new CassandraQueryBuilder();
	}

	getType(): string {
		return 'cassandra';
	}

	public async exists(pluginId: string, db: string, table: string) {
		// TODO: complete implementation
	}

	public async alter(pluginId: string, schemaData: object) {
		// TODO: complete implementation
	}

	public async migrate(pluginId: string, schemaData: object) {
		// TODO: complete implementation
	}

	public async create(pluginId: string, schemaData: any) {
		let defaultKeyspaceSettings: ICassandraConfig["defaultKeyspaceSettings"]= _.get(schemaData, "dbConfig.defaultKeyspaceSettings");
		await this.createKeyspace(this.generateKeyspaceName(pluginId, schemaData.db), Object.assign(this._config.defaultKeyspaceSettings, defaultKeyspaceSettings));
		await this.createTables(pluginId, schemaData)
	}

	private async createTables(pluginId: string, schemaData: any) {
		let keyspaceName = this.generateKeyspaceName(pluginId, schemaData.db);
		this.dbConnection = this.cassandraDB.getConnectionByKeyspace(keyspaceName);
		for(let table of schemaData.tables) {
			await this.dbConnection.connect()
				.then(() => {
					this.dbConnection.execute(this.queryBuilder.createTable(schemaData, table, keyspaceName));
					console.log(`====> Table: ${keyspaceName}.${table.name} created for "${pluginId}"`)
				})
				.catch((err) => {
					throw new FrameworkError({code: FrameworkErrors.DB_ERROR, rootError: err})
				});
		}
	}

	private async createKeyspace(name: string, defaultSettings: ICassandraConfig["defaultKeyspaceSettings"]) {
		this.dbConnection = this.cassandraDB.getConnection(this._config);
		await this.dbConnection.connect()
				.then(() => {
					const query = `CREATE KEYSPACE IF NOT EXISTS ${name} WITH replication = ` + JSON.stringify(defaultSettings.replication).split("\"").join("'");
					this.dbConnection.execute(query);
				})
				.then(delayPromise(100))
				.catch((err) => {
					throw new FrameworkError({code: FrameworkErrors.DB_ERROR, rootError: err})
				});
	}

	private generateKeyspaceName(pluginId: string, db: string): string {
		return Util.generateId(pluginId, db);
	}
}

SchemaLoader.registerLoader(new CassandraSchemaLoader(defaultConfig.db.cassandra));