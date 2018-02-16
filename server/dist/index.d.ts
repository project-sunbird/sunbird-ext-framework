/// <reference types="express" />
import { db } from './db';
import { FrameworkAPI } from './api';
import { Express } from 'express';
export declare class Framework {
    private _db;
    private _api;
    private static _initialized;
    private static _instance;
    constructor(config: object, cb: (...args: any[]) => void, app?: Express);
    readonly db: db;
    readonly api: FrameworkAPI;
    static initialize(config: object, cb: (...args: any[]) => void, app?: Express): Framework;
}
