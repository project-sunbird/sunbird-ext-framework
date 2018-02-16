/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

export interface ISchemaLoader {

	getType(): string;

	exists(pluginId: string, db: string, table: string, cb: (err: object, res: object) => void) : void;

	create(pluginId: string, schemaData: object, cb: (err: object, res: object) => void) : void;

    alter(pluginId: string, schemaData: object, cb: (err: object, res: object) => void) : void;

    migrate(pluginId: string, schemaData: object, cb: (err: object, res: object) => void) : void;
}