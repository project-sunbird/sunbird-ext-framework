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

	public getConnection(keyspace: string, defaultSettings?: ICassandraConfig["defaultKeyspaceSettings"]): any {
		return new cassandraDriver.Client(this.getNewClient(keyspace, defaultSettings));
	}

	private getNewClient(keyspace: string, defaultSettings?: ICassandraConfig["defaultKeyspaceSettings"]): ICassandraConfig {
		return {
			contactPoints: this._config.contactPoints,
			keyspace,
			defaultKeyspaceSettings: defaultSettings || this._config.defaultKeyspaceSettings,	
		}
	}
}