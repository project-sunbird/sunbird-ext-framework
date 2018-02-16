"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SchemaLoader_1 = require("../SchemaLoader");
var CassandraSchemaLoader = /** @class */ (function () {
    function CassandraSchemaLoader() {
    }
    CassandraSchemaLoader.prototype.getType = function () {
        return 'cassandra';
    };
    CassandraSchemaLoader.prototype.exists = function (pluginId, db, table, cb) {
    };
    CassandraSchemaLoader.prototype.create = function (pluginId, schemaData, cb) {
    };
    CassandraSchemaLoader.prototype.alter = function (pluginId, schemaData, cb) {
    };
    CassandraSchemaLoader.prototype.migrate = function (pluginId, schemaData, cb) {
    };
    return CassandraSchemaLoader;
}());
SchemaLoader_1.SchemaLoader.registerLoader(new CassandraSchemaLoader());
