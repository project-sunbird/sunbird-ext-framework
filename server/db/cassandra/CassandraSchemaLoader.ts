/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import {ISchemaLoader} from '../ISchemaLoader'
import {SchemaLoader} from '../SchemaLoader'
import {defaultConfig} from '../../config';
import { CassandraDB } from './index';
import { Manifest } from '../../models/Manifest';
import {ICassandraConfig, ICassandraConnector} from '../../interfaces';
import {CassandraQueryBuilder} from './CassandraQueryBuilder';

class CassandraSchemaLoader implements ISchemaLoader {
	
	private _config: ICassandraConfig;
	private cassandraDB: CassandraDB;
	private dbConnection: ICassandraConnector;
	private queryBuilder: CassandraQueryBuilder;

	constructor(config: ICassandraConfig) {
		this._config = config;
		this.cassandraDB = new CassandraDB(config);
		this.dbConnection = this.cassandraDB.getConnection(Manifest.fromJSON(JSON.stringify({ id: "core.famework.schema"})))
		this.queryBuilder = new CassandraQueryBuilder();
	}

	getType(): string {
		return 'cassandra';
	}

	async exists(pluginId: string, db: string, table: string) {

	}

	async create(pluginId: string, schemaData: any) {
		return new Promise((resolve, reject) => {
				schemaData.tables.forEach((table) => {
				this.dbConnection.execute(this.queryBuilder.createTable(table), (err, result) => {
					if(result) resolve(result);
					if(err) reject(err);
				})
			})
		})
	}

    async alter(pluginId: string, schemaData: object) {

	}

    async migrate(pluginId: string, schemaData: object) {

	}


}

SchemaLoader.registerLoader(new CassandraSchemaLoader(defaultConfig.db.cassandra));