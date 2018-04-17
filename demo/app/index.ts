import {FrameworkConfig} from 'ext-framework-server/interfaces';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import {Framework} from 'ext-framework-server'
import * as dotenv from 'dotenv';

const config: FrameworkConfig = {
     db: {
        cassandra: {
            contactPoints: ['127.0.0.1'],
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
    plugins: [{id: 'profile-server', ver: '1.0'}],
    pluginBasePath: __dirname + '/node_modules/',
    secureContextParams: ["x-authenticated-user-token", "user-id"],
    kafka: {
        connectionString: '127.0.0.1:2181' //default
    },
    port: 9000
};

const expressApp  = express()
expressApp.use(bodyParser.json({limit: '50mb'}))
expressApp.use(express.static('public'));

Framework.initialize(config, expressApp).then(()=> {
    dotenv.config();
    console.log(`=====> Application running on port: ${config.port}`);
    expressApp.listen(config.port);
});

