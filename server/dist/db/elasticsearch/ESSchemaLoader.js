"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SchemaLoader_1 = require("../SchemaLoader");
var ESSchemaLoader = /** @class */ (function () {
    function ESSchemaLoader() {
    }
    ESSchemaLoader.prototype.getType = function () {
        return 'elasticsearch';
    };
    ESSchemaLoader.prototype.exists = function (pluginId, db, table, cb) {
    };
    ESSchemaLoader.prototype.create = function (pluginId, schemaData, cb) {
    };
    ESSchemaLoader.prototype.alter = function (pluginId, schemaData, cb) {
    };
    ESSchemaLoader.prototype.migrate = function (pluginId, schemaData, cb) {
    };
    return ESSchemaLoader;
}());
SchemaLoader_1.SchemaLoader.registerLoader(new ESSchemaLoader());
