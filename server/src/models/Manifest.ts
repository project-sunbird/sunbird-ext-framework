/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

import { IPlugin } from "../interfaces";
import * as _ from 'lodash';
import { FrameworkError, FrameworkErrors } from "../util";

/**
 * 
 * 
 * @export
 * @interface IRouteSchema
 */
export interface IRouteSchema {
    prefix: string;
}
/**
 * 
 * 
 * @export
 * @interface IDatabaseType
 */
export interface IDatabaseType {
    type: string;
    path: string;
    compatibility: string;
}
/**
 * 
 * 
 * @export
 * @interface IServerSchema
 */
export interface IServerSchema {
    routes?: IRouteSchema;
    dependencies?: Array<IPlugin>;
    databases?: Array<IDatabaseType>;
}
/**
 * 
 * 
 * @export
 * @interface IPluginManifest
 */
export interface IPluginManifest {
    id: string;
    name: string;
    version: string;
    author: string;
    description?: string;
    server: IServerSchema;
}
/**
 * 
 * 
 * @export
 * @class Manifest
 */
export class Manifest {

    private _id: string;
    private _name: string;
    private _version: string;
    private _author: string;
    private _description: string;
    private _server: IServerSchema;
    private json: IPluginManifest;
    
    /**
     * Creates an instance of Manifest.
     * @param {IPluginManifest} manifest 
     * @memberof Manifest
     */
    constructor(manifest: IPluginManifest) {
        this.json = manifest;
        this._id = manifest.id;
        this._version = manifest.version;
        this._author = manifest.author;
        this._description = manifest.description;
        this._server = manifest.server;
    }
    /**
     * 
     * 
     * @static
     * @param {(IPluginManifest | string)} json 
     * @returns {Manifest} 
     * @memberof Manifest
     */
    public static fromJSON(json: IPluginManifest | string): Manifest {
        try {
            if (typeof json === "string") json = JSON.parse(json) as IPluginManifest;
            return new Manifest(json);
        } catch(error) {
            throw new FrameworkError({message: `unable to parse manifest, invalid JSON format!`, code: FrameworkErrors.MANIFEST_NOT_PARSEABLE, rootError: error});
        }
    }

    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberof Manifest
     */
    public get id(): string {
        return this._id;
    }
    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberof Manifest
     */
    public get name(): string {
        return this._name;
    }
    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberof Manifest
     */
    public get version(): string {
        return this._version;
    }
    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberof Manifest
     */
    public get author(): string {
        return this._author;
    }
    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberof Manifest
     */
    public get description(): string {
        return this._description;
    }
    /**
     * 
     * 
     * @readonly
     * @type {IServerSchema}
     * @memberof Manifest
     */
    public get server(): IServerSchema {
        return this._server;
    }
    /**
     * 
     * 
     * @returns 
     * @memberof Manifest
     */
    public getDependencies() {
        return this.server.dependencies;
    }
    /**
     * 
     * 
     * @memberof Manifest
     */
    public validate() {
        // TODO: validate schema structure;
    }
    
    /**
     * 
     * 
     * @param {boolean} toString 
     * @returns {(IPluginManifest | string)} 
     * @memberof Manifest
     */
    public toJSON(toString: boolean = false): IPluginManifest | string {
        if (toString) return JSON.stringify(this.json);
        return _.cloneDeep(this.json);
    }
}