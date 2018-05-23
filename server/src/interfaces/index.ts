import { Router, NextFunction } from 'express';
import { Manifest, IPluginManifest } from '../models/Manifest';
import { ClientOptions, Client } from 'cassandra-driver';
import { ConfigOptions, Client as ESClient } from 'elasticsearch';
import * as kafka from 'kafka-node';

export interface IRouter {
    init(app: Router, auth: any, manifest: Manifest): void;
}

export interface IRouterConstructor {
    new(): IRouter;
}

export interface IServer {

}

export interface IServerConstructor {
    new(config: object, manifest: Manifest): IServer;
}

export interface IElasticSearchConfig extends ConfigOptions {
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
    db?: IDatabaseConfig;
    plugins: Array<IPlugin>;
    pluginBasePath: string;
    secureContextParams?: Array<string>;
    port?: number;
    kafka?: KafkaConfig;
    enableLogs?: Boolean;
}

export interface KafkaConfig {
    connectionString: string;
    clientId?: string;
    options?: kafka.ZKOptions;
    noBatchOptions?: kafka.AckBatchOptions;
    sslOptions?: any;
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
    uninstalled,
    unregistered,
}

export interface PluginMeta {
    id: string;
    uuid: string;
    name: string;
    version: string;
    repo: string;
    registered_on: Date;
    cassandra_keyspace: string;
    elasticsearch_index: string;
    status: PluginStatusEnum;
    manifest: string;
}

export interface IMetaDataProvider {
    getMeta(id: string);
    updateMeta(id: string, meta: PluginMeta);
    createMeta(meta: PluginMeta);
    deleteMeta(id: string);
}

/**
 * Interface for Message providers
 * 
 * @export
 * @interface IMessageProvider
 */
export interface IMessageProvider {
    /**
     * Initialize the provider with config details
     * 
     * @param {object} config
     * @memberof IMessageProvider
     */
    initialize(config: object);
    /**
     * 
     * To register event producer.
     * @param {string} id format: <pluginId>
     * @param {object} [options] 
     * @memberof IMessageProvider
     */
    registerProducer(id: string, options?: object);
    /**
     * 
     * To unregister producer. Producer cannot publish message or create topic after unregisteration 
     * @param {string} id
     * @memberof IMessageProvider
     */
    unregisterProducer(id: string);
    /**
     *
     * To publish message to all consumers
     * @param {string} topic
     * @param {object} payload
     * @memberof IMessageProvider
     */
    publishMessage(topic: string, payload: object);
    /**
     * 
     * To register consumer based on topic created by producer
     * @param {string} topic 
     * @param {object} [options] 
     * @memberof IMessageProvider
     */
    registerConsumer(topic: string, options?: object);
    /**
     * 
     * To unregsiter consumer. Consumer cannot reveice any message after unregistration
     * @param {string} id 
     * @memberof IMessageProvider
     */
    unregisterConsumer(id: string);
    /**
     * 
     * To create topic. Only producer can create topics
     * @param {Array<string>} names format: <pluginId>:<actionPrefix>_<eventName>_<version>
     * e.g: ["org.sunbird.profile:post_createDocument_v1"] 
     * @memberof IMessageProvider
     */
    createTopic(names: Array<string>);
}
