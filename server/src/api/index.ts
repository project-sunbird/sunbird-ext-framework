/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { PluginManager } from "../managers/PluginManager";
import { FrameworkConfig } from "../interfaces";
import { CassandraDB } from "../db";

export class FrameworkAPI {
    constructor(private config: FrameworkConfig) {
        this.config = config;
    }

    public getCassandraInstance() {
        return new CassandraDB(this.config.db.cassandra)
    }
}

export const api = FrameworkAPI;