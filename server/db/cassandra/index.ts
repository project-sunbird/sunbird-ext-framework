/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import {Manifest} from '../../models/Manifest';
import { CassandraConnection } from './CassandraConnection';
import * as cassandraDriver from 'cassandra-driver';
import {Util} from '../../util';
import { ICassandraConfig } from "../../interfaces";

export class CassandraDB {

	private _config: ICassandraConfig;

	constructor(config: ICassandraConfig) {
		this._config = config;
	}

	getConnection(manifest: Manifest): any {
		return new cassandraDriver.Client(this._config);
	}
}