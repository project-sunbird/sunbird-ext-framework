"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./CassandraSchemaLoader");
var Proxy = require("harmony-proxy");
var expressCassandra = require("express-cassandra");
var util_1 = require("../../util");
function proxyMethodCalls(obj, indexPrefix) {
    var handler = {
        get: function (target, propKey, receiver) {
            var origMethod = target[propKey];
            if (propKey == 'transport') {
                return origMethod;
            }
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                args[0].index = indexPrefix + '_' + args[0].index;
                var result = origMethod.apply(this, args);
                return result;
            };
        }
    };
    return new Proxy(obj, handler);
}
var CassandraDB = /** @class */ (function () {
    function CassandraDB(config) {
        this._config = config;
    }
    CassandraDB.prototype.getConnection = function (manifest) {
        var client = expressCassandra.createClient(this._config.db.cassandra || {});
        return proxyMethodCalls(client, util_1.Util.hash(manifest.id));
    };
    return CassandraDB;
}());
exports.CassandraDB = CassandraDB;
//export const cassandraDB = new CassandraDB(10);
exports.cassandraDB = CassandraDB;
