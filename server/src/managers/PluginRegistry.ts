/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest, IPluginManifest } from "../models/Manifest";
import { FrameworkError, FrameworkErrors } from "../util";
import { IMetaDataProvider, PluginMeta, PluginStatusEnum } from "../interfaces";
import * as UUID from 'uuid/v1';

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
public static async register(manifest: Manifest): Promise<void> {
        let isRegistered = await PluginRegistry.isRegistered(manifest.id);
        if (!isRegistered) {
            let metaObject: PluginMeta = {
                id: manifest.id,
                uuid: UUID(),
                name: manifest.name || '',
                version: manifest.version || '',
                repo: 'local',
                registered_on: new Date(),
                cassandra_keyspace: '',
                elasticsearch_index: '',
                status: PluginStatusEnum.registered,
                manifest: JSON.stringify(manifest.toJSON())
            };
            await PluginRegistry.metaDataProvider.createMeta(metaObject);
            console.log(`=====> Plugin: ${manifest.id} is registered!`);
        } else {
            console.log(`=====> Plugin: ${manifest.id} is already registered!`);
            throw new FrameworkError({ message: `Plugin: ${manifest.id} is already registered!`, code: FrameworkErrors.PLUGIN_REGISTERED})
        }
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
        return await PluginRegistry.updateStatus(id, PluginStatusEnum.unregistered);
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
        if(result) {
            let plugin = result.rows.find((row) => row.id === id);
            return plugin.status === PluginStatusEnum.registered
        } else return false;
    }
/**
 * 
 * 
 * @static
 * @param {string} id 
 * @returns 
 * @memberof PluginRegistry
 */
public static async getStatus(id: string) {
        let result = await PluginRegistry.metaDataProvider.getMeta(id);
        if(result) {
            let plugin = result.rows.find((row) => row.id === id);
            return PluginStatusEnum[plugin.status];
        } else return;
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
public static async updateStatus(id: string, status: PluginStatusEnum) {
        let result = await PluginRegistry.metaDataProvider.getMeta(id);
        if(result) {
            let plugin = result.rows.find((row) => row.id === id);
            plugin.status = status;
            return await PluginRegistry.metaDataProvider.updateMeta(id, plugin);
        } else return;
    }
}