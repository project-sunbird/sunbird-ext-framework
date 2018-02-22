/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { SchemaLoader } from '../SchemaLoader'
import { Manifest } from '../../models/Manifest';

class ESSchemaLoader implements ISchemaLoader {

	getType(): string {
		return 'elasticsearch';
	}

	async exists(pluginId: string, db: string, table: string) {

	}

	async create(manifest: Manifest, schemaData: object) {
		console.log('create schema for elasticsearch invoked!');
	}

	async alter(pluginId: string, schemaData: object) {

	}

	async migrate(pluginId: string, schemaData: object) {

	}
}

SchemaLoader.registerLoader(new ESSchemaLoader())