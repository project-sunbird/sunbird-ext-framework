import { Router } from "express";
import { Manifest } from "../models/Manifest";
import {ClientOptions, Client} from 'cassandra-driver';
import {ConfigOptions, Client as ESClient} from 'elasticsearch';
export interface IRouter {
    init(app: Router, auth: any, manifest: Manifest): void
}

export interface IRouterConstructor {
    new () : IRouter;
}

export interface IServer {
    
}

export interface IServerConstructor {
    new(config: object, manifest: Manifest) : IServer;
}

export interface IElasticSearchConfig extends ConfigOptions{
    host: string;
    disabledApis: Array<string>;
}

export interface IPlugin {
    id: string;
    ver: string;
}

export interface ICassandraConfig extends ClientOptions {
    defaultKeyspaceSettings?: {
        replication: {
            class: string,
            replication_factor: string
        }
    }
}

export interface ICassandraConnector extends Client {

}

export interface IElasticSearchConnector extends ESClient {

}

export interface IDatabaseConfig {
    cassandra: ICassandraConfig;
    elasticsearch: IElasticSearchConfig;
}

export interface FrameworkConfig {
    db: IDatabaseConfig;
    plugins: Array<IPlugin>;
    pluginBasePath: string;
}

export enum PluginStatusEnum {
	unknown,
    created,
    registered,
	installed,
	resolved,
	started,
	stopped,
	active,
	uninstalled
}

export interface PluginMeta {
    id: string;
    uuid: string;
    class?: IServerConstructor;
    status: PluginStatusEnum;
    manifest: Manifest;
    instance?: IServer;
}

export interface IMetaDataProvider {
    getMeta(id: string);
    updateMeta(id: string, meta: PluginMeta);
    createMeta(meta: PluginMeta);
    deleteMeta(id: string);
}