/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { CassandraDB } from './cassandra';
import { ElasticSearchDB } from './elasticsearch';

export class db {

	private _elasticsearch: ElasticSearchDB;
	private _cassandra: CassandraDB;

	constructor(config: object) {
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