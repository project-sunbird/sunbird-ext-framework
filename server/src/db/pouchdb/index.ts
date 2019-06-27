/**
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 */

const PouchDataBase = require('pouchdb');
import { IPouchDBConfig } from "../../interfaces";
import * as _ from 'lodash';
import { Util } from '../../util';
import { Singleton } from 'typescript-ioc';
import * as path from 'path';
PouchDataBase.plugin(require('pouchdb-find'));
@Singleton
export class PouchDB {

  private _config: IPouchDBConfig;


  public initialize(config: IPouchDBConfig) {
    this._config = config;
  }

  public getConnection(pluginId: string, dbName: string): any {
    const dbPath = this._config.path;
    // TODO: add the proxy method to restrict 
    return new PouchDataBase(path.join(dbPath, Util.generateId(pluginId, dbName)));
  }

}
