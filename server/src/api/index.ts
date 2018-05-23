/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { PluginManager } from "../managers/PluginManager";
import { FrameworkConfig, ICassandraConnector, IElasticSearchConnector } from "../interfaces";
import { CassandraDB, ElasticSearchDB } from "../db";
import { RouterRegistry } from "../managers/RouterRegistry";
import { Util } from "../util";
import {defaultConfig} from '../config';

export class FrameworkAPI {
    constructor(private config: FrameworkConfig) {
        this.config = config;
    }

    public getCassandraInstance(pluginId: string, schema: any): ICassandraConnector {
        let instance = new CassandraDB(this.config.db.cassandra);
        return instance.getConnectionByKeyspace(Util.generateId(pluginId, schema.db));
    }

    public getElasticsearchInstance(pluginId: string, schema: any): IElasticSearchConnector {
        return ElasticSearchDB.getConnection(pluginId);
    }

    public threadLocal() {
        return RouterRegistry.getThreadNamespace();
    }
}

export const api = FrameworkAPI;