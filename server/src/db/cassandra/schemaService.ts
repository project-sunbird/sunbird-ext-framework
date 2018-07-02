import { Util } from '../../util';
import * as _ from 'lodash';

export class SchemaService {
  private schemaMap = {};

  public setSchema(pluginId: string, schema: any) {
    if (pluginId) this.schemaMap[pluginId] = _.cloneDeep(schema);
  }

  public getSchemaByPlugin(pluginId: string) {
    if (pluginId) return _.cloneDeep(this.schemaMap[pluginId]);
  }

  public getSchemaBykeyspace(keyspace: string) {
    if (keyspace) {
      return _.values(this.schemaMap).find((schema: any) => {
        return schema.keyspace_name === keyspace;
      })
    }
  }
}

export const schemaService = new SchemaService();