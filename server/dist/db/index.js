"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var cassandra_1 = require("./cassandra");
var elasticsearch_1 = require("./elasticsearch");
var db = /** @class */ (function () {
    function db(config) {
        this._elasticsearch = new elasticsearch_1.ElasticSearchDB(config);
        this._cassandra = new cassandra_1.CassandraDB(config);
    }
    Object.defineProperty(db.prototype, "elasticsearch", {
        get: function () {
            return this._elasticsearch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(db.prototype, "cassandra", {
        get: function () {
            return this._cassandra;
        },
        enumerable: true,
        configurable: true
    });
    return db;
}());
exports.db = db;
__export(require("./cassandra"));
__export(require("./elasticsearch"));
