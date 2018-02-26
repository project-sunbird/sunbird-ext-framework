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

	getConnection(manifest: Manifest, db: string): any {
		return new cassandraDriver.Client(this.getNewClient(manifest, db));
	}

	private getNewClient(manifest: Manifest, db: string, defaultSettings?: ICassandraConfig["defaultKeyspaceSettings"]): ICassandraConfig {
		return {
			contactPoints: this._config.contactPoints,
			keyspace: Util.generateId(manifest.id, db),
			defaultKeyspaceSettings: defaultSettings || this._config.defaultKeyspaceSettings,	
		}
	}
}