/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { SchemaLoader } from '../SchemaLoader'
import { defaultConfig } from '../../config';
import { CassandraDB } from './index';
import { Manifest } from '../../models/Manifest';
import { ICassandraConfig, ICassandraConnector } from '../../interfaces';
import { CassandraQueryBuilder } from './CassandraQueryBuilder';
import { Util, FrameworkError, FrameworkErrors } from '../../util';

class CassandraSchemaLoader implements ISchemaLoader {

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

	async exists(pluginId: string, db: string, table: string) {

	}

	async create(manifest: Manifest, schemaData: any) {
		await this.createTables(manifest, schemaData);
	}

	private async createTables(manifest: Manifest, schemaData: any) {
		this.dbConnection = this.cassandraDB.getConnection(manifest);
		let keyspaceName = this.generateKeyspaceName(manifest.id, schemaData.db);
		let noOfTables = schemaData.tables.length;
		schemaData.tables.forEach(async (table, index) => {
			await this.dbConnection.connect()
				.then(() => {
					const query = `CREATE KEYSPACE IF NOT EXISTS ${keyspaceName} WITH replication = ` + "{'class': 'SimpleStrategy', 'replication_factor': '1' }";
					//+ JSON.stringify(this._config.defaultKeyspaceSettings.replication);
					return this.dbConnection.execute(query);
				})
				.then(() => {
					return this.dbConnection.execute(this.queryBuilder.createTable(schemaData, table, keyspaceName));
				})
				.then(() => {
					return this.dbConnection.shutdown();
				})
				.catch((err) => {
					console.log(err);
					this.dbConnection.shutdown();
					throw new FrameworkError({code: FrameworkErrors.DB_ERROR, rootError: err})
				});
				if (index === noOfTables - 1) console.log(`====> Tables created for plugin "${manifest.id}": keyspace: "${keyspaceName}"`)
		})
	}

	private generateKeyspaceName(manifestId: string, db: string): string {
		return (Util.hash(manifestId) + '_' + db).toLowerCase();
	}


	async alter(pluginId: string, schemaData: object) {

	}

	async migrate(pluginId: string, schemaData: object) {

	}
}

SchemaLoader.registerLoader(new CassandraSchemaLoader(defaultConfig.db.cassandra));