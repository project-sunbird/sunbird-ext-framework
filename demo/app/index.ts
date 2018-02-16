import * as express from 'express'
import * as bodyParser from 'body-parser'
import {Framework} from 'ext-framework-server'

const expressApp  = express()
expressApp.use(bodyParser.json({limit: '50mb'}))

const framework = Framework.initialize({}, ()=> {}, expressApp);

expressApp.listen(8000);