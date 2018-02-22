/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import {ISchemaLoader} from '../ISchemaLoader'
import {SchemaLoader} from '../SchemaLoader'

class CassandraSchemaLoader implements ISchemaLoader {

	getType(): string {
		return 'cassandra';
	}

	async exists(pluginId: string, db: string, table: string) {

	}

	async create(pluginId: string, schemaData: object) {
		console.log('create schema for cassandra invoked!');
	}

    async alter(pluginId: string, schemaData: object) {

	}

    async migrate(pluginId: string, schemaData: object) {

	}
}

SchemaLoader.registerLoader(new CassandraSchemaLoader());