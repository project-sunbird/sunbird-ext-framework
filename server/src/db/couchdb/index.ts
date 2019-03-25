/**
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 */

import * as nano from 'nano';
import { ICouchDBConfig } from "../../interfaces";
import * as _ from 'lodash';
import { defaultConfig } from "../../config";
import { Util } from '../../util';

export class CouchDB {

  private _config: ICouchDBConfig;


  public initialize(config: ICouchDBConfig) {
    this._config = config;
  }

  public getConnection(pluginId: string): any {
    const url = this._config.url;
    const connection = nano(url);
    connection.db = this.proxyMethod(connection.db, pluginId);
    return connection
  }

  private proxyMethod(obj: any, pluginId: string) {
    let handler = {
      get: function (target, property) {
        switch (property) {
          case 'use':
            return function () {
              let dbName = Util.generateId(pluginId, arguments[0]);
              return target[property].apply(target, [dbName]);
            }
            break
        }
        return target[property];
      }
    }
    return new Proxy(obj, handler);
  }

}
