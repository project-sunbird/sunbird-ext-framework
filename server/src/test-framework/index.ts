import * as bodyParser from 'body-parser'
import {Framework, FrameworkConfig} from '../index';
import { Manifest } from '../models/Manifest';
import { PluginManager } from '../managers/PluginManager';
import * as express from 'express';

const defaultConfig: FrameworkConfig = {
     db: {
        cassandra: {
            contactPoints: ['127.0.0.1'],
            keyspace: 'core_framework_schema',
            defaultKeyspaceSettings: {
                replication: {
			        'class': 'SimpleStrategy',
  			        'replication_factor': '1'
		        }
            }
        },
        elasticsearch: {
            host: "127.0.0.1:9200",
            disabledApis: ["cat", "cluster", "indices", "ingest", "nodes", "remote", "snapshot", "tasks"]
        }
    },
    plugins: [],
    pluginBasePath: __dirname + '/node_modules/'
};

const PORT: number = 9000

export class TestFramework {
    private static config: FrameworkConfig;

    public static initialize(config: FrameworkConfig) {
        return new Promise((resolve, reject) => {
            let expressApp = express();
            config = {...defaultConfig,...config};
            Framework.initialize(config, expressApp).then(()=> {
                console.log(`=====> Application running on port: ${PORT}`);
                expressApp.use(bodyParser.json({limit: '50mb'}))
                expressApp.listen(PORT);
                resolve();
            });
        });
    }

    public static getPluginInstance(id: Manifest['id']) {
        return PluginManager.getPluginInstance(id);
    }
}