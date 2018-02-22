/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import './CassandraSchemaLoader';
import {Manifest} from '../../models/Manifest';
import { CassandraConnection } from './CassandraConnection';
import * as Proxy from 'harmony-proxy';
import * as expressCassandra from 'express-cassandra';
import {Util} from '../../util';
import { FrameworkConfig } from "../../interfaces";

function proxyMethodCalls(obj: any, indexPrefix: string) {
    let handler = {
        get(target:any, propKey: any, receiver: any) {
			const origMethod = target[propKey];
			if(propKey == 'transport') {
                return origMethod;
            }
            return function (this: void, ...args: any[]) {
				args[0].index = indexPrefix + '_' + args[0].index;
                let result = origMethod.apply(this, args);
                return result;
            };
        }
    };
    return new Proxy(obj, handler);
}

export class CassandraDB {

	private _config: FrameworkConfig;

	constructor(config: FrameworkConfig) {
		this._config = config;
	}

	getConnection(manifest: Manifest): any {
		let client = expressCassandra.createClient(this._config.db.cassandra || {});
		return proxyMethodCalls(client, Util.hash(manifest.id));
	}
}