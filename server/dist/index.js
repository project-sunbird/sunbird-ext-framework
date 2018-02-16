"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var api_1 = require("./api");
var Framework = /** @class */ (function () {
    function Framework(config, cb, app) {
        this._db = new db_1.db(config);
        this._api = new api_1.FrameworkAPI(config);
        // 1. create plugin_registry table
        //		PluginRegistry.initialize();
        // 2. load plugins
        //		PluginManager.load()
        cb();
    }
    Object.defineProperty(Framework.prototype, "db", {
        get: function () {
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Framework.prototype, "api", {
        get: function () {
            return this._api;
        },
        enumerable: true,
        configurable: true
    });
    Framework.initialize = function (config, cb, app) {
        if (!Framework._initialized) {
            Framework._instance = new Framework(config, cb, app);
            console.log('=====> Framework initialized!');
        }
        return Framework._instance;
    };
    Framework._initialized = false;
    return Framework;
}());
exports.Framework = Framework;
