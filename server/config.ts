/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { FrameworkConfig } from "./interfaces";

let config = {
    db: {
        cassandra: {
            contactPoints: ['127.0.0.1'],
            keyspace: 'core_framework_schema'
        },
        elasticsearch: {
            host: "localhost:9200",
            disabledApis: ["cat", "cluster", "indices", "ingest", "nodes", "remote", "snapshot", "tasks"]
        }
    },
    plugins: [],
    pluginBasePath: ""
};

export const defaultConfig = <FrameworkConfig> config;