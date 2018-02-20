import * as express from 'express'
import * as bodyParser from 'body-parser'
import {Framework} from 'ext-framework-server'
import * as config from './frameworkConfig.json';

const expressApp  = express()
const PORT: number = 9000
expressApp.use(bodyParser.json({limit: '50mb'}))

const framework = Framework.initialize(config, ()=> {
    console.log(`=====> Application running on port: ${PORT}`);
    expressApp.listen(PORT);
}, expressApp);

