/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { Manifest, IPluginManifest } from '../models/Manifest';
import { IRouterConstructor, IServerConstructor, IPlugin, FrameworkConfig } from '../interfaces';
import { FrameworkError, FrameworkErrors } from '../util';
import { PluginRegistry } from './PluginRegistry';
import { RouterRegistry } from './RouterRegistry';
import * as _ from 'lodash';
import { SchemaLoader, ISchemaLoader } from '../db';
import * as glob from 'glob';
import { logger } from '../logger';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
export class PluginLoader {
  @Inject
  public pluginRegistry: PluginRegistry;

  @Inject
  public routerRegistry: RouterRegistry;

  @Inject
  public schemaLoader: SchemaLoader;

  private config: FrameworkConfig;
  private pluginsLoaded: Array<string> = [];
  private pluginInstances: any = {};

  public initialize(config: FrameworkConfig) {
    this.config = _.cloneDeep(config);
    this.pluginRegistry.initialize({ metaProviderConfig: config.db.cassandra });
  }

  public async loadDBSchema(manifest: Manifest, path: string) {
    for (const schemaFilePath of glob.sync(path, {})) {
      const schema: any = await import(schemaFilePath)
        .catch((error) => {
          throw new FrameworkError({ message: `invalid schema file path for plugin ${manifest.id}`, code: FrameworkErrors.INVALID_SCHEMA_PATH, rootError: error });
        });
      const schemaLoader = this.schemaLoader.getLoader(schema.type) as ISchemaLoader;
      await schemaLoader.create(manifest.id, schema)
        .catch((error) => {
          throw new FrameworkError({ message: `Error while loading DB schema for plugin ${manifest.id}`, code: FrameworkErrors.SCHEMA_LOADER_FAILED, rootError: error });
        });
    }
  }

  public getPluginManifest(pluginId: string): Manifest {
    return;
  }

  public getPluginInstance(pluginId: string): any {
    return this.pluginInstances[pluginId];
  }

  public async loadDependencies(manifest: Manifest) {
    for (const dependency of manifest.server.dependencies) {
      if (this.pluginsLoaded.indexOf(dependency.id) === -1) {
        await this.loadPlugin(dependency)
          .then(() => {
            logger.info(`"${manifest.id}" plugin loaded`);
          })
          .catch((error) => {
            this.unregister(manifest.id);
            logger.error(`unable to load dependent plugin! "${manifest.id}"`, error);
            throw new FrameworkError({ message: 'unable to load dependent plugin!', code: FrameworkErrors.PLUGIN_LOAD_FAILED, rootError: error });
          })
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
    if (!_.isEmpty(manifest.server.dependencies)) await this.loadDependencies(manifest); // step 3
    await this.pluginRegistry.register(manifest).catch((error) => {
      this.unregister(plugin.id);
      logger.error(`unable to register plugin! "${manifest.id}"`, error);
      throw new FrameworkError({ message: 'unable to register plugin!', code: FrameworkErrors.PLUGIN_REGISTER_FAILED, rootError: error });
    }); // Step 4
    await this.buildPlugin(manifest)
      .catch((error) => {
        this.unregister(plugin.id);
        logger.error(`unable to load plugin! "${manifest.id}"`, error);
        throw new FrameworkError({ message: 'unable to load plugin!', code: FrameworkErrors.PLUGIN_LOAD_FAILED, rootError: error });
      });
  }

  public async buildPlugin(manifest) {
    try{
      await this.preparePlugin(manifest), // Step 5
      await this.instantiatePlugin(manifest), // Step 6
      await this.registerRoutes(manifest) // Step 7
    }
    catch(error) {
      logger.error(`failed to build plugin! "${manifest.id}"`, error);
      throw new FrameworkError({ message: 'plugin build failed!', code: FrameworkErrors.PLUGIN_BUILD_FAILED, rootError: error });
    };
  }

  public isPluginLoaded(pluginId: string) {
    if (this.pluginsLoaded.indexOf(pluginId) === -1) return false;
    return true;
  }

  private register(pluginId: string) {
    this.pluginsLoaded.push(pluginId);
  }

  private unregister(pluginId: string) {
    _.remove(this.pluginsLoaded, loadedPluginId => loadedPluginId === pluginId)
  }

  private async getManifest(plugin: IPlugin) {
    // TODO: Look for multiple paths
    const pluginId = plugin.id;
    const pluginManifest = await import(this.config.pluginBasePath + pluginId + '/manifest').catch((error) => {
      throw new FrameworkError({ message: `manifest not found for the plugin ${plugin.id}`, code: FrameworkErrors.MANIFEST_NOT_FOUND, rootError: error });
    })
    return Manifest.fromJSON(pluginManifest.manifest as IPluginManifest);
  }

  private async preparePlugin(manifest: Manifest) {
    // PluginRegistry checks if database schema is created for the plugin
    // if migration, do migration
    // if not, db schema for the plugin should be created
    const schemaPath = this.config.pluginBasePath + manifest.id + '/db/**/schema*.json';
    await this.loadDBSchema(manifest, schemaPath).catch((error) => {
      logger.error(`error while loading database schema models! "${manifest.id}"`, error);
    });
  }

  private async instantiatePlugin(manifest: Manifest) {
    try {
      const pluginFile = await import(this.config.pluginBasePath + manifest.id + '/server').catch((error) => {
        logger.error('Entry file not found for the plugin ${manifest.id}', error);
        throw new FrameworkError({ message: `Entry file not found for the plugin ${manifest.id}`, code: FrameworkErrors.ENTRY_FILE_NOT_FOUND, rootError: error });
      });
      const pluginClass: IServerConstructor = pluginFile.Server as IServerConstructor;
      this.pluginInstances[manifest.id] = new pluginClass(manifest);
    } catch (err) {
      logger.error('error when instantiate plugin', err);
      throw new FrameworkError({ code: FrameworkErrors.PLUGIN_INSTANCE_FAILED, rootError: err });
    }
  }

  private async registerRoutes(manifest: Manifest) {
    try {
      const router = this.routerRegistry.bindRouter(manifest);
      let pluginRouter = await import(this.config.pluginBasePath + manifest.id + '/routes').catch((error) => {
        throw new FrameworkError({ message: `Router file not found for the plugin ${manifest.id}`, code: FrameworkErrors.ROUTER_FILE_NOT_FOUND, rootError: error });
      });
      pluginRouter = pluginRouter.Router as IRouterConstructor;
      const routerInstance = new pluginRouter();
      routerInstance.init(router, manifest);
    } catch (err) {
      logger.error(`error while registering routes "${manifest.id}"`, err);
      throw new FrameworkError({ code: FrameworkErrors.PLUGIN_ROUTE_INIT_FAILED, rootError: err });
    }
  }
}