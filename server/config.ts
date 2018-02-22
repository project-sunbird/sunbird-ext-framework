/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { FrameworkConfig } from "./interfaces";

let config = {
    db: {
        cassandra: {
            contactPoint: "127.0.0.1",
            port: 9042,
            defaultKeyspaceSettings: {
                replication: {
			        class: "SimpleStrategy",
  			        "replication_factor": "1"
		        }
            }
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