/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { CassandraDB } from './cassandra';
import { ElasticSearchDB } from './elasticsearch';
import { FrameworkConfig } from '../interfaces';
import './cassandra/CassandraSchemaLoader';

export class db {

	private _elasticsearch: ElasticSearchDB;
	private _cassandra: CassandraDB;

	constructor(config: FrameworkConfig) {
		this._elasticsearch = new ElasticSearchDB(config);
		this._cassandra = new CassandraDB(config);
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