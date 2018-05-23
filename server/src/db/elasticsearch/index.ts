/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest } from '../../models/Manifest';
import * as elasticsearch from 'elasticsearch';
// import * as Proxy from 'harmony-proxy';
import { Util } from '../../util';
import { IElasticSearchConfig, IElasticSearchConnector } from "../../interfaces";
import { logger } from '../../logger';

function proxyMethodCalls(obj: IElasticSearchConnector, disableAPI: Array<string>) {
    logger.info('===> configuring proxy method for Elasticsearch client Instance!');
    let handler = {
        get(target, propKey, receiver) {
            const originalMethod = target[propKey];
            if (disableAPI.findIndex(propKey) !== -1) {
                logger.info(` ${propKey}: this api is disabled!`);
                return;
            }
            return function (...args) {
                return originalMethod.apply(this, args);
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
        ElasticSearchDB._client = ElasticSearchDB._client || new elasticsearch.Client(ElasticSearchDB._config); // || proxyMethodCalls(new elasticsearch.Client(ElasticSearchDB._config), ElasticSearchDB._config.disabledApis);
        // logger.log('target', ElasticSearchDB._client.search);  
        return ElasticSearchDB._client;
    }
};