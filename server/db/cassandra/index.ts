/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
*/

import './CassandraSchemaLoader';
import {Manifest} from '../../models/Manifest';
import { CassandraConnection } from './CassandraConnection';

export class CassandraDB {

	constructor(poolSize: number = 10) {
		// TODO: Read cassandra config and instantiate pool
	}

	getConnection(manifest: Manifest): CassandraConnection {
		return new CassandraConnection();
	}
}

//export const cassandraDB = new CassandraDB(10);

export const cassandraDB = CassandraDB;