import { Router } from "express";
import { Manifest } from "../models/Manifest";

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

export interface IElasticSearchConfig {
    host: string;
    disabledApis: Array<string>;
}

export interface IPlugin {
    id: string;
    ver: string;
}

export interface ICassandraConfig {
    contactPoint: string;
    port: number;
    defaultKeyspaceSettings: object;
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