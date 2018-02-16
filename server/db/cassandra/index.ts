/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import './CassandraSchemaLoader';
import {Manifest} from '../../models/Manifest';
import { CassandraConnection } from './CassandraConnection';

export class CassandraDB {

	constructor(config: any) {
		// TODO: Read cassandra config and instantiate pool
	}

	getConnection(manifest: Manifest): CassandraConnection {
		return new CassandraConnection();
	}
}

//export const cassandraDB = new CassandraDB(10);

export const cassandraDB = CassandraDB;