import * as bodyParser from 'body-parser'
import {Framework, FrameworkConfig} from '../index';
import { Manifest } from '../models/Manifest';
import { PluginManager } from '../managers/PluginManager';
import * as express from 'express';
import {defaultConfig} from '../config';

export class TestFramework {
    private static config: FrameworkConfig;

    public static initialize(config: FrameworkConfig) {
        return new Promise((resolve, reject) => {
            let expressApp = express();
            config = {...defaultConfig,...config};
            Framework.initialize(config, expressApp).then(()=> {
                console.log(`=====> Application running on port: ${defaultConfig.port}`);
                expressApp.use(bodyParser.json({limit: '50mb'}))
                expressApp.listen(defaultConfig.port);
                resolve();
            });
        });
    }

    public static getPluginInstance(id: Manifest['id']) {
        return PluginManager.getPluginInstance(id);
    }
}