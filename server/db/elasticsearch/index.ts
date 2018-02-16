/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import './ESSchemaLoader';
import { Manifest } from '../../models/Manifest';
import * as elasticsearch from 'elasticsearch';
import * as Proxy from 'harmony-proxy';
import { Util } from '../../util';

function proxyMethodCalls(obj: any, indexPrefix: string) {
    let handler = {
        get(target: any, propKey: any, receiver: any) {
            const origMethod = target[propKey];
            if (propKey == 'transport') {
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

export class ElasticSearchDB {

    private _config: any;

    constructor(config: any) {
        this._config = config;
    }

    getConnection(manifest: Manifest): any {
        let client = new elasticsearch.Client(this._config.db.es || {});
        return proxyMethodCalls(client, Util.hash(manifest.id));
    }
}