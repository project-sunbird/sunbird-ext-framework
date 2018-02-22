/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

export interface ISchemaLoader {

	getType(): string;

	exists(pluginId: string, db: string, table: string);

	create(pluginId: string, schemaData: object);

    alter(pluginId: string, schemaData: object);

    migrate(pluginId: string, schemaData: object);
}