/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { PluginManager } from "../managers/PluginManager";
import { FrameworkConfig } from "../interfaces";
import { CassandraDB, cassandraDriver, ElasticSearchDB } from "../db";
import { RouterRegistry } from "../managers/RouterRegistry";
import { Util } from "../util";

export class FrameworkAPI {
    constructor(private config: FrameworkConfig) {
        this.config = config;
    }

    public getCassandraInstance(pluginId: string, schema: any): cassandraDriver.Client {
        let instance = new CassandraDB(this.config.db.cassandra);
        return instance.getConnectionByKeyspace(Util.generateId(pluginId, schema.db));
    }

    public getElasticsearchInstance(pluginId: string, schema: any) {
        let instance = new ElasticSearchDB();
        return instance.getConnection(pluginId, true);
    }

    public threadLocal() {
        return RouterRegistry.getThreadNamespace();
    }
}

export const api = FrameworkAPI;