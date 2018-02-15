/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
*/

import {ISchemaLoader} from '../ISchemaLoader'
import {SchemaLoader} from '../SchemaLoader'

class CassandraSchemaLoader implements ISchemaLoader {

	getType(): string {
		return 'cassandra';
	}

	exists(pluginId: string, db: string, table: string, cb: (err: object, res: object) => void) : void {

	}

	create(pluginId: string, schemaData: object, cb: (err: object, res: object) => void) : void {

	}

    alter(pluginId: string, schemaData: object, cb: (err: object, res: object) => void) : void {

	}

    migrate(pluginId: string, schemaData: object, cb: (err: object, res: object) => void) : void {

	}
}

SchemaLoader.registerLoader(new CassandraSchemaLoader());