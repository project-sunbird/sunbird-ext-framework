import * as bodyParser from 'body-parser'
import { FrameworkConfig } from '../interfaces';
import * as express from 'express';
import { defaultConfig } from '../config';
import { frameworkAPI } from '../api';

export class TestFramework {
  private static config: FrameworkConfig;

  public static async initialize(config: FrameworkConfig) {
    let expressApp = express();
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    });
    expressApp.use(bodyParser.json({ limit: '50mb' }))
    config = { ...defaultConfig, ...config };
    await frameworkAPI.bootstrap(config, expressApp).then(() => {
      expressApp.listen(config.port);
      console.log(`=====> Application running on port: ${config.port}`);
    });
  }
}