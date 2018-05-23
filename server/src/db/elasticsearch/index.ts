/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest } from '../../models/Manifest';
import * as elasticsearch from 'elasticsearch';
// import * as Proxy from 'harmony-proxy';
import { Util } from '../../util';
import { IElasticSearchConfig, IElasticSearchConnector } from "../../interfaces";
import { logger } from '../../logger';

function proxyMethodCalls(obj: IElasticSearchConnector, disabledAPIs: Array<string>) {
  let handler = {
    get(target, propKey, receiver) {
      if (disabledAPIs.indexOf(propKey) !== -1) {
        logger.error(`ElasticsearchAPI: ${propKey}: this api is disabled!`);
        return Object.create({});
      }
      if (typeof target[propKey] === 'object' && target[propKey] !== null) {
        return new Proxy(target[propKey], handler)
      }
      const originalMethod = target[propKey];
      return function () {
        return originalMethod.apply(target, arguments);
      }
    }
  };
  return new Proxy(obj, handler);
}

export class ElasticSearchDB {

  private static _config: IElasticSearchConfig;
  private static _client: IElasticSearchConnector;

  public static initialize(config: IElasticSearchConfig): ElasticSearchDB {
    ElasticSearchDB._config = config;
    return ElasticSearchDB;
  }

  public static getConnection(pluginId: string, proxy?: boolean): IElasticSearchConnector {
    // Elasticsearch.js allows only one instance of 'Client'
    // src: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
    ElasticSearchDB._client = ElasticSearchDB._client || proxyMethodCalls(new elasticsearch.Client(ElasticSearchDB._config), ElasticSearchDB._config.disabledApis);
    return ElasticSearchDB._client;
  }
};