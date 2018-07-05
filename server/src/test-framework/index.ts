import * as bodyParser from 'body-parser'
import {Framework, FrameworkConfig} from '../index';
import { Manifest } from '../models/Manifest';
import * as express from 'express';
import {defaultConfig} from '../config';

export class TestFramework {
    private static config: FrameworkConfig;

    public static initialize(config: FrameworkConfig) {
        return new Promise((resolve, reject) => {
            let expressApp = express();
            expressApp.use(bodyParser.json({ limit: '50mb' }))
            config = {...defaultConfig,...config};
            Framework.initialize(config, expressApp).then(()=> {
                console.log(`=====> Application running on port: ${config.port}`);
                expressApp.listen(config.port);
                resolve();
            });
        });
    }
}