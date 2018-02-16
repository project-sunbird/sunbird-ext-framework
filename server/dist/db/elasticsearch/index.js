"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./ESSchemaLoader");
var elasticsearch = require("elasticsearch");
var Proxy = require("harmony-proxy");
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
var ElasticSearchDB = /** @class */ (function () {
    function ElasticSearchDB(config) {
        this._config = config;
    }
    ElasticSearchDB.prototype.getConnection = function (manifest) {
        var client = new elasticsearch.Client(this._config.db.es || {});
        return proxyMethodCalls(client, util_1.Util.hash(manifest.id));
    };
    return ElasticSearchDB;
}());
exports.ElasticSearchDB = ElasticSearchDB;
