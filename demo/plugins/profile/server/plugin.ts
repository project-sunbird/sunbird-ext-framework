import {Framework} from 'ext-framework-server/index'
import {PluginManager} from 'ext-framework-server/managers/pluginManager';
import {Manifest} from 'ext-framework-server/models/Manifest';

export class ExtPlugin {

    onLoad() {
        console.log('Framework.db()', Framework.db());
        let cassandra = Framework.db().cassandra();
        console.log(cassandra);
    }
    
}