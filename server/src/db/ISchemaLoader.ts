/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

export interface ISchemaLoader {

  getType(): string;

  exists(pluginId: string, schema: any)

  create(pluginId: string, schema: any)

  alter(pluginId: string, schema: any)

  migrate(pluginId: string, schema: any)
}