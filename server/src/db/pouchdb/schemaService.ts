import { Util } from '../../util';
import * as _ from 'lodash';
import { Singleton } from 'typescript-ioc';
@Singleton
export class SchemaService {
    private schemaMap = {};

    public setSchema(pluginId: string, schema: any) {
        if (pluginId) this.schemaMap[pluginId] = _.cloneDeep(schema);
    }

    public getSchemaByPlugin(pluginId: string) {
        if (pluginId) return _.cloneDeep(this.schemaMap[pluginId]);
    }

    public getSchemaByDatabase(database: string) {
        if (database) {
            return _.find(_.values(this.schemaMap), (schema: any) => {
                return _.some(schema.databases, { name: database });
            })
        }
    }
}