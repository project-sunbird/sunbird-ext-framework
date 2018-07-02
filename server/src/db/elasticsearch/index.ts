/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest } from '../../models/Manifest';
import * as elasticsearch from 'elasticsearch';
import { Util } from '../../util';
import { IElasticSearchConfig, IElasticSearchConnector } from "../../interfaces";
import { logger } from '../../logger';

export class ElasticSearchDB {

  private static _config: IElasticSearchConfig;

  public static initialize(config: IElasticSearchConfig): ElasticSearchDB {
    ElasticSearchDB._config = config;
    return ElasticSearchDB;
  }

  public static getConnection(pluginId: string): IElasticSearchConnector {
    let connection: any = new elasticsearch.Client(JSON.parse(JSON.stringify(ElasticSearchDB._config)));
    connection._pluginId = pluginId;
    return ElasticSearchDB.proxyMethod(connection, ElasticSearchDB._config.disabledApis);
  }

  private static proxyMethod(obj: any, disabledAPIs: Array<string>) {
    let handler = {
      get(target, propKey, receiver) {
        const originalMethod = target[propKey];
        if (disabledAPIs.indexOf(propKey) !== -1) {
          logger.error(`Elasticsearch: ${propKey}: this api is disabled!`);
          return Object.create({});
        }
        if (typeof target[propKey] === 'object' && target[propKey] !== null) {
          return new Proxy(target[propKey], handler)
        }
        return function () {
          const params = arguments[0];
          // append the index with prefix (pluginId)
          if (typeof params === "object") {
            if (params.index) params.index = Util.generateId(obj._pluginId, params.index) 
          }
          if (typeof originalMethod === "function") {
            return originalMethod.apply(target, arguments);
          } else {
            return Object.create({});
          }
        }
      }
    };
    return new Proxy(obj, handler);
  }
};