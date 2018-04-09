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

	public getConnectionByKeyspace(keyspace?: string, defaultSettings?: ICassandraConfig["defaultKeyspaceSettings"]): cassandraDriver.Client {
		return this.getConnection({
			contactPoints: this._config.contactPoints,
			keyspace: keyspace || this._config.keyspace,
			defaultKeyspaceSettings: defaultSettings || this._config.defaultKeyspaceSettings,	
		});
	}

	public getConnection(config: ICassandraConfig): cassandraDriver.Client {
		return new cassandraDriver.Client(config);
	}
}