"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SchemaLoader = /** @class */ (function () {
    function SchemaLoader() {
    }
    SchemaLoader.registerLoader = function (loader) {
        this.loaders[loader.getType()] = loader;
    };
    SchemaLoader.getLoader = function (type) {
        return this.loaders[type.toLowerCase()];
    };
    SchemaLoader.loaders = {};
    return SchemaLoader;
}());
exports.SchemaLoader = SchemaLoader;
