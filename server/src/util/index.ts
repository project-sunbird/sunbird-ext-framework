/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import * as Hashids from 'hashids';

export class Util {
    public static hash(text: string): string {
        let hash = new Hashids(text, 5, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
        return hash.encode(1).toLowerCase();
    }

    public static generateId(prefix: string, id: string): string {
		return (Util.hash(prefix) + '_' + id).toLowerCase();
    }
}

export enum FrameworkErrors {
    MANIFEST_NOT_FOUND,
    MANIFEST_NOT_PARSEABLE,
    METHOD_NOT_IMPLEMENTED,
    PLUGIN_LOAD_FAILED,
    ROUTE_REGISTRY_FAILED,
    UNKNOWN_ERROR,
    DB_ERROR,
    SCHEMA_LOADER_FAILED,
    PLUGIN_REGISTERED
}

export interface ErrorSubclass extends Error {
}

export class ErrorSubclass {

    public name: string;
    public message: string;
    public stack: string;

    constructor(message: string) {

        this.name = "ErrorSubclass";
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
}

//ErrorSubclass.prototype = <any>Object.create( Error.prototype );
Object.defineProperty(ErrorSubclass, 'prototype', <any>Object.create(Error.prototype));

export interface FrameworkErrorOptions {
    message?: string;
    detail?: string;
    extendedInfo?: string;
    code: FrameworkErrors;
    rootError?: any;
}

export class FrameworkError extends ErrorSubclass {

    public name: string;
    public detail: string;
    public extendedInfo: string;
    public code: FrameworkErrors;
    public rootError: any;

    constructor(options: FrameworkErrorOptions) {

        super(options.message);
        this.name = "FrameworkError";
        this.detail = (options.detail || "");
        this.extendedInfo = (options.extendedInfo || "");
        this.code = (options.code || FrameworkErrors.UNKNOWN_ERROR);
        this.rootError = (options.rootError || null);

    }

    public print(): string {

        return ("FrameworkError:: code:" + this.code + " | message:" + this.message + " | rootErr:" + this.rootError);

    }

}