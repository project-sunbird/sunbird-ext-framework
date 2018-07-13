/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest, IPluginManifest } from "../models/Manifest";
import { FrameworkError, FrameworkErrors } from "../util";
import { IMetaDataProvider, PluginMeta, PluginStatusEnum } from "../interfaces";
import * as UUID from 'uuid/v1';
import { logger } from '../logger';
import { Singleton, AutoWired, Inject } from "typescript-ioc";
import { CassandraMetaDataProvider } from "../meta/CassandraMetaDataProvider";
/**
 * 
 * 
 * @export
 * @class PluginRegistry
 */
@Singleton
export class PluginRegistry {

  @Inject
  public metaDataProvider: CassandraMetaDataProvider;

  private config: any;

  public initialize(config: { metaProviderConfig: any }) {
    this.config = { ...config }
    this.metaDataProvider.initialize(config.metaProviderConfig);
  }
  /**
   * 
   * 
   * @static
   * @param {Manifest} manifest 
   * @returns {Promise<void>} 
   * @memberof PluginRegistry
   */
  public async register(manifest: Manifest): Promise<Boolean> {
    let isRegistered = await this.isRegistered(manifest.id);
    if (!isRegistered) {
      let metaObject: PluginMeta = { id: manifest.id, name: manifest.name || '', version: manifest.version || '', repo: 'local', registered_on: new Date(), status: PluginStatusEnum.registered, manifest: JSON.stringify(manifest.toJSON()) };
      await this.metaDataProvider.createMeta(metaObject);
      logger.info(`Plugin "${manifest.id}" is registered!`);
    } else {
      logger.info(`Plugin "${manifest.id}" is already registered!`);
    }
    return true;
  }
  /**
   * 
   * 
   * @static
   * @param {string} id 
   * @returns 
   * @memberof PluginRegistry
   */
  public async unregister(id: string) {
    await this.updateStatus(id, PluginStatusEnum.unregistered);
  }
  /**
   * 
   * 
   * @static
   * @param {string} id 
   * @returns {Promise<boolean>} 
   * @memberof PluginRegistry
   */
  public async isRegistered(id: string): Promise<boolean> {
    let result = await this.metaDataProvider.getMeta(id);
    if (result) {
      let plugin = result.rows.find((row) => row.id === id);
      return plugin && plugin.status && plugin.status === PluginStatusEnum.registered
    }
  }
  /**
   * 
   * 
   * @static
   * @param {string} id 
   * @returns {Promise<PluginStatusEnum | undefined>}
   * @memberof PluginRegistry
   */
  public async getStatus(id: string): Promise<PluginStatusEnum | undefined> {
    let result = await this.metaDataProvider.getMeta(id);
    if (result) {
      let plugin = result.rows.find((row) => row.id === id);
      return plugin && plugin.status && PluginStatusEnum[PluginStatusEnum[plugin.status]];
    }
  }
  /**
   * 
   * 
   * @static
   * @param {string} id 
   * @param {PluginStatusEnum} status 
   * @returns 
   * @memberof PluginRegistry
   */
  public async updateStatus(id: string, status: PluginStatusEnum): Promise<any> {
    await this.metaDataProvider.updateMeta(id, { status });
  }
}