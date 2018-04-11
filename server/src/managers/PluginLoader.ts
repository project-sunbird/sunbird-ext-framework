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

	public getPluginInstance(pluginId: string) : any {
		return this._pluginInstances[pluginId];
	}

    private async loadDependencies(manifest: Manifest) {
        for (let dependency of manifest.server.dependencies) {
            if (this._pluginsLoaded.indexOf(dependency.id) == -1) {
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
        let instance = this;
        this._pluginsLoaded.push(plugin.id); // Step 1
        const manifest = await this.getManifest(plugin); // Step 2
        const pluginManifest = _.cloneDeep(manifest);
        if (typeof (manifest.server.dependencies) !== undefined) { // Step 3
            await this.loadDependencies(pluginManifest);
        }
        await Promise.all([PluginRegistry.register(pluginManifest), // Step 4
            instance.preparePlugin(pluginManifest), // Step 5
            instance.instantiatePlugin(pluginManifest), // Step 6
            instance.registerRoutes(pluginManifest) // Step 7
        ])
    }

    private async getManifest(plugin: IPlugin) {
        try {
            //TODO: Look for multiple paths
            const pluginId = plugin.id;
            const pluginManifest = await import(this.config.pluginBasePath + pluginId + '/manifest');
            return Manifest.fromJSON(<IPluginManifest>pluginManifest.manifest);
        } catch (err) {
            throw new FrameworkError({ code: FrameworkErrors.MANIFEST_NOT_FOUND, rootError: err });
        }
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
            let pluginFile = await import(this.config.pluginBasePath + manifest.id + '/server');
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
            let pluginRouter = await import(this.config.pluginBasePath + manifest.id + '/routes');
            pluginRouter = <IRouterConstructor>pluginRouter.Router;
            const routerInstance = new pluginRouter();
            routerInstance.init(router, manifest);
        } catch (err) {
            throw new FrameworkError({ code: FrameworkErrors.ROUTE_REGISTRY_FAILED, rootError: err });
        }
    }

    public static async loadDBSchema(manifest: Manifest, path: string) {
        let files = glob.sync(path, {});
        for (let path of files) {
            try {
                let schema = await import(path);
                let schemaLoader = <ISchemaLoader>SchemaLoader.getLoader(schema.type);
                await schemaLoader.create(manifest.id, schema);
            } catch (error) {
                throw new FrameworkError({ message: `Error while laoding DB schema for plugin ${manifest.id}`, code: FrameworkErrors.SCHEMA_LOADER_FAILED, rootError: error });
            }
        }
    }
}