/**
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 */

import * as nano from 'nano';
import { ICouchDBConfig } from "../../interfaces";
import * as _ from 'lodash';
import { defaultConfig } from "../../config";

export class CouchDB {

    private _config: ICouchDBConfig;


    public initialize(config: ICouchDBConfig) {
        this._config = config;
    }

    public getConnection(): any {
        const url = this._config.url || defaultConfig.db.couchdb.url;
        const connection = nano(url);
        // TODO: need to implement proxy method to use only plugin databases
        return connection;
    }

}
