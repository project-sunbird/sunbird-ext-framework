import { Router } from "express";
import { Manifest } from "../models/Manifest";
import {ClientOptions, Client} from 'cassandra-driver';

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

export interface ICassandraConfig extends ClientOptions {

}

export interface ICassandraConnection extends Client {

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

