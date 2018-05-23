/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { CassandraDB } from './cassandra';
import { ElasticSearchDB } from './elasticsearch';
import { FrameworkConfig } from '../interfaces';
import './cassandra/CassandraSchemaLoader';
import './elasticsearch/ESSchemaLoader';

export class Db {

	private _elasticsearch: ElasticSearchDB;
	private _cassandra: CassandraDB;

	constructor(config: FrameworkConfig) {
		this._elasticsearch = ElasticSearchDB.initialize(config.db.elasticsearch);
		this._cassandra = new CassandraDB(config.db.cassandra);
	}

	public elasticsearch(): ElasticSearchDB {
		return this._elasticsearch;
	}

	public cassandra(): CassandraDB {
		return this._cassandra;
	}
}

export * from './cassandra';
export * from './elasticsearch';
export * from './SchemaLoader';
export * from './ISchemaLoader';