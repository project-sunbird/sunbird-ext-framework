/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { ISchemaLoader } from '../ISchemaLoader'
import { SchemaLoader } from '../SchemaLoader'
import { IElasticSearchConfig, IElasticSearchConnector } from '../../interfaces';
import { ElasticSearchDB } from './index';
import {defaultConfig} from '../../config';
import { Util } from '../../util';
import { ESSchemaMapper } from './ESSchemaMapper';

class ESSchemaLoader implements ISchemaLoader {
	
	private _config: IElasticSearchConfig;
	private dbConnection: IElasticSearchConnector;
	
	constructor(config: IElasticSearchConfig) {
		this._config = config;
	}

	public async alter(pluginId: string, schemaData: object) {
		// TODO: complete implementation
	}

	public async migrate(pluginId: string, schemaData: object) {
		// TODO: complete implementation
	}

	public getType(): string {
		return 'elasticsearch';
	}

	async exists(pluginId: string, db: string, table: string) {
		await this.isIndexDefined(this.generateESIndex(pluginId, db));
	}

	async create(pluginId: string, schemaData: any) {
		this.dbConnection = ElasticSearchDB.getConnection(pluginId);
		let indexName = this.generateESIndex(pluginId, schemaData.db);
		let indexDefined = await this.isIndexDefined(indexName);
		if (!indexDefined) {
			await this.createIndex(indexName);
			console.log(`=====> Index: "${indexName}" :New Index has been created in Elasticsearch`);
			await this.createIndexAlias(indexName, this.generateESIndexAlias(pluginId));
			console.log(`=====> Index Alias: "${this.generateESIndexAlias(pluginId)}"`);
			await this.createMapping(pluginId, schemaData);
		} else {
			console.log(`=====> index: "${indexName}" already defined!`);
		}
	}

	private async createIndex(index: string) {
		await this.dbConnection.indices.create({index});
	}

	private generateESIndex(pluginId: string, db: string): string {
		return Util.generateId(pluginId, db);
	}

	private generateESIndexAlias(pluginId: string): string {
		return Util.hash(pluginId);
	}

	private async isIndexDefined(index: string) {
		const isDefined = await this.dbConnection.indices.exists({index});
    return isDefined;
	}

	private async createMapping(pluginId: string, schemaData: any) {
		let indexName = this.generateESIndex(pluginId, schemaData.db);
		schemaData.tables.forEach(async (table) => {
			let body = ESSchemaMapper.getFieldsfromJSON(table);
			console.log(`====> creating mappings for type: "${table.table}" under index: "${indexName}"`);
			await this.dbConnection.indices.putMapping({ index: indexName, type: table.table, body})
		})
	}

	private async createIndexAlias(index: string, alias: string) {
		await this.dbConnection.indices.putAlias({ index, name: alias })
	}
}

SchemaLoader.registerLoader(new ESSchemaLoader(defaultConfig.db.elasticsearch))