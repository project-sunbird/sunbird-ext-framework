/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest, IPluginManifest } from "../models/Manifest";
import { FrameworkError, FrameworkErrors } from "../util";
import { IMetaDataProvider, PluginMeta, PluginStatusEnum } from "../interfaces";
import * as UUID from 'uuid/v1';
import { logger } from '../logger';

/**
 * 
 * 
 * @export
 * @class PluginRegistry
 */
export class PluginRegistry {

  private static metaDataProvider: IMetaDataProvider;
  /**
   * 
   * 
   * @static
   * @param {IMetaDataProvider} metaDataProvider 
   * @memberof PluginRegistry
   */
  public static initialize(metaDataProvider: IMetaDataProvider) {
    PluginRegistry.metaDataProvider = metaDataProvider;
  }

  /**
   * 
   * 
   * @static
   * @param {Manifest} manifest 
   * @returns {Promise<void>} 
   * @memberof PluginRegistry
   */
  public static async register(manifest: Manifest): Promise<Boolean> {
    let isRegistered = await PluginRegistry.isRegistered(manifest.id);
    if (!isRegistered) {
      let metaObject: PluginMeta = { id: manifest.id, name: manifest.name || '', version: manifest.version || '', repo: 'local', registered_on: new Date(), status: PluginStatusEnum.registered, manifest: JSON.stringify(manifest.toJSON()) };
      await PluginRegistry.metaDataProvider.createMeta(metaObject);
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
  public static async unregister(id: string) {
    await PluginRegistry.updateStatus(id, PluginStatusEnum.unregistered);
  }
  /**
   * 
   * 
   * @static
   * @param {string} id 
   * @returns {Promise<boolean>} 
   * @memberof PluginRegistry
   */
  public static async isRegistered(id: string): Promise<boolean> {
    let result = await PluginRegistry.metaDataProvider.getMeta(id);
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
  public static async getStatus(id: string): Promise<PluginStatusEnum | undefined> {
    let result = await PluginRegistry.metaDataProvider.getMeta(id);
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
  public static async updateStatus(id: string, status: PluginStatusEnum): Promise<any> {
    await PluginRegistry.metaDataProvider.updateMeta(id, { status });
  }
}