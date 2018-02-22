import * as express from 'express'
import * as bodyParser from 'body-parser'
import {Framework} from 'ext-framework-server'

const expressApp  = express()
const PORT: number = 9000
expressApp.use(bodyParser.json({limit: '50mb'}))

const framework = Framework.initialize({
    plugins: [{id: 'profile-server', ver: '1.0'}],
    pluginBasePath: __dirname + '/node_modules/'
}, expressApp).then(()=> {
    console.log(`=====> Application running on port: ${PORT}`);
    expressApp.listen(PORT);
});

