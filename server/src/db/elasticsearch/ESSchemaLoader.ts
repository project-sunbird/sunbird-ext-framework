/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import { IElasticSearchConfig, IElasticSearchConnector } from '../../interfaces';
import { ElasticSearchDB } from './index';
import { Util, FrameworkError, FrameworkErrors } from '../../util';
import * as _ from 'lodash';
import {logger } from '../../logger';
import { Inject, Singleton } from 'typescript-ioc';
import { CassandraMetaDataProvider } from '../../meta/CassandraMetaDataProvider';
import { ISchemaLoader } from '..';

@Singleton
export class ESSchemaLoader implements ISchemaLoader {

  private _config: IElasticSearchConfig;
  private dbConnection: IElasticSearchConnector;

  @Inject
  private metaDataProvider: CassandraMetaDataProvider;

  @Inject
  private elasticSearchDB: ElasticSearchDB;

  constructor(config: IElasticSearchConfig) {
    this._config = config;
    this.elasticSearchDB.initialize(config)
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

  async exists(pluginId: string, schema: any) {
    for (const index of schema.indexes) {
      await this.isIndexDefined(index);
    }
  }

  async create(pluginId: string, schema: any) {
    this.dbConnection = this.elasticSearchDB.getConnection(pluginId);
    this.validateSchema(schema);
    await this.createSchema(pluginId, schema).then(() => {
      logger.info(`mappings successfully created for plugin "${pluginId}" `);
    })
  }

  private validateSchema(schema) {
    if (!schema.indexes || !Array.isArray(schema.indexes)) {
      throw new FrameworkError({ message: `invalid schema, "indexes" is not defined`, code: FrameworkErrors.DB_ERROR })
    }
    for (const index of schema.indexes) {
      if (!index.mappings || typeof index.mappings !== "object") {
        throw new FrameworkError({ message: `invalid schema, "mappings" should be of type Object!`, code: FrameworkErrors.DB_ERROR })
      }

      if (!index.name) {
        throw new FrameworkError({ message: `invalid schema, "name" should be defined for index!`, code: FrameworkErrors.DB_ERROR })
      }
    }
  }

  private async createIndex(index: string, body: any) {
    await this.dbConnection.indices.create({ index, body });
  }

  private generateESIndexAlias(id: string): string {
    return Util.hash(id);
  }

  private async isIndexDefined(index: string) {
    const isDefined = this.dbConnection.indices.exists({ index });
    return isDefined;
  }

  private async createSchema(pluginId: string, schema: any) {
    if (!schema || !schema.indexes) return;
    for (const indexMapping of schema.indexes) {
      let indexName: string = Util.generateId(pluginId, indexMapping.name);
      let indexDefined = await this.isIndexDefined(indexMapping.name);
      if (!indexDefined) {
        await this.createIndex(indexMapping.name, _.omit(indexMapping, ['name']));
        logger.info(`Index "${indexName}" has been created in Elasticsearch for ${pluginId}`);
        const alias = this.generateESIndexAlias(pluginId + indexName);
        await this.createIndexAlias(indexMapping.name, alias);
        await this.metaDataProvider.updateMeta(pluginId, { elasticsearch_index: { '$add': {[indexName]: alias} }});
        logger.info(`creating mappings for index "${indexName}"`);
      } else {
        logger.info(`index "${indexName}" already defined! for "${pluginId}"`);
      }
    }
  }

  private async createIndexAlias(index: string, alias: string) {
    await this.dbConnection.indices.putAlias({ index, name: alias }).then(() => {
      logger.debug(`=====> Alias created for index: "${index}", alias: "${alias}"`);
    })
  }
}

