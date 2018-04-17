/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest, IPluginManifest } from "../models/Manifest";
import { IRouterConstructor, IServerConstructor, IPlugin, FrameworkConfig } from '../interfaces';
import { FrameworkError, FrameworkErrors } from "../util";
import { PluginRegistry } from "./PluginRegistry";
import { RouterRegistry } from "./RouterRegistry";
import * as _ from 'lodash';
import { SchemaLoader, ISchemaLoader } from '../db';
import * as glob from 'glob';

export class PluginLoader {

    private _config: FrameworkConfig;
    private _pluginsLoaded: Array<string> = [];
    private _pluginInstances: any = {};

    constructor(config: FrameworkConfig) {
        this._config = _.cloneDeep(config);
    }

    get config(): FrameworkConfig {
        return this._config;
    }

    public getPluginManifest(pluginId: string): Manifest {
        return this._pluginInstances.find((plugin) => {
            return plugin.id === pluginId;
        });
    }

    public getPluginInstance(pluginId: string): any {
        return this._pluginInstances[pluginId];
    }

    private async loadDependencies(manifest: Manifest) {
        for (let dependency of manifest.server.dependencies) {
            if (this._pluginsLoaded.indexOf(dependency.id) === -1) {
                await this.loadPlugin(dependency);
            }
        }
    }

    /**
     * Steps:
     *  1) Put a placeholder to indicate that this plugin is triggered for load so the cyclic dependencies don't kill the process
     *  2) Load manifest
     *  3) Load dependencies first
     *  4) Register the plugin
     *  5) Prepare the plugin - create/alter schema, run migration
     *  6) Instantiate the plugin
     *  7) Register the routes
     *
     * @param plugin IPlugin
     */
    public async loadPlugin(plugin: IPlugin) {
        if (this.isPluginLoaded(plugin.id)) return;
        this.register(plugin.id); // Step 1
        const manifest = await this.getManifest(plugin); // Step 2
        if (manifest.server.dependencies) await this.loadDependencies(manifest); //step 3
        await PluginRegistry.register(manifest) // Step 4
        await this.buildPlugin(manifest).catch((error) => {
            this.unregister(plugin.id)
            throw new FrameworkError({ message: 'plugin load failed ', code: FrameworkErrors.PLUGIN_LOAD_FAILED, rootError: error });
        })
    }

    public async buildPlugin(manifest) {
        await Promise.all([
            this.preparePlugin(manifest), // Step 5
            this.instantiatePlugin(manifest), // Step 6
            this.registerRoutes(manifest) // Step 7
        ]).catch((error) => {
            throw new FrameworkError({ message: 'plugin build failed ', code: FrameworkErrors.PLUGIN_BUILD_FAILED, rootError: error });
        })
    }

    private register(pluginId: string) {
        this._pluginsLoaded.push(pluginId);
    }

    private unregister(pluginId: string) {
        _.remove(this._pluginsLoaded, (loadedPluginId) => loadedPluginId === pluginId)
    }

    public isPluginLoaded(pluginId: string) {
        if (this._pluginsLoaded.indexOf(pluginId) === -1) return false;
        return true;
    }

    private async getManifest(plugin: IPlugin) {
        //TODO: Look for multiple paths
        const pluginId = plugin.id;
        const pluginManifest = await import(this.config.pluginBasePath + pluginId + '/manifest').catch((error) => {
            throw new FrameworkError({ message: `manifest not found for the plugin ${plugin.id}`, code: FrameworkErrors.MANIFEST_NOT_FOUND, rootError: error });
        })
        return Manifest.fromJSON(<IPluginManifest>pluginManifest.manifest);
    }

    private async preparePlugin(manifest: Manifest) {
        // PluginRegistry checks if database schema is created for the plugin
        // if migration, do migration
        // if not, db schema for the plugin should be created
        let schemaPath = this.config.pluginBasePath + manifest.id + '/db/**/schema*.json';
        await PluginLoader.loadDBSchema(manifest, schemaPath);
    }

    private async instantiatePlugin(manifest: Manifest) {
        try {
            let pluginFile = await import(this.config.pluginBasePath + manifest.id + '/server').catch((error) => {
                throw new FrameworkError({ message: `Entry file not found for the plugin ${manifest.id}`, code: FrameworkErrors.ENTRY_FILE_NOT_FOUND, rootError: error });
            });
            let pluginClass = <IServerConstructor>pluginFile.Server;
            let pluginInstance = new pluginClass(this.config, manifest);
            this._pluginInstances[manifest.id] = pluginInstance;
        } catch (err) {
            throw new FrameworkError({ code: FrameworkErrors.PLUGIN_INSTANCE_FAILED, rootError: err });
        }
    }

    private async registerRoutes(manifest: Manifest) {
        try {
            let router = RouterRegistry.bindRouter(manifest);
            let pluginRouter = await import(this.config.pluginBasePath + manifest.id + '/routes').catch((error) => {
                throw new FrameworkError({ message: `Router file not found for the plugin ${manifest.id}`, code: FrameworkErrors.ROUTER_FILE_NOT_FOUND, rootError: error });
            });
            pluginRouter = <IRouterConstructor>pluginRouter.Router;
            const routerInstance = new pluginRouter();
            routerInstance.init(router, manifest);
        } catch (err) {
            throw new FrameworkError({ code: FrameworkErrors.PLUGIN_ROUTE_INIT_FAILED, rootError: err });
        }
    }

    public static async loadDBSchema(manifest: Manifest, path: string) {
        for (let schemaFilePath of glob.sync(path, {})) {
            let schema = await import(schemaFilePath).catch((error) => {
                throw new FrameworkError({ message: `invalid schema file path for plugin ${manifest.id}`, code: FrameworkErrors.INVALID_SCHEMA_PATH, rootError: error });
            });
            let schemaLoader = <ISchemaLoader>SchemaLoader.getLoader(schema.type);
            await schemaLoader.create(manifest.id, schema).catch((error) => {
                throw new FrameworkError({ message: `Error while laoding DB schema for plugin ${manifest.id}`, code: FrameworkErrors.SCHEMA_LOADER_FAILED, rootError: error });
            });
        }
    }
}