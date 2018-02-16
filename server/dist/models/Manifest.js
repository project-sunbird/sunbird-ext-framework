"use strict";
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Manifest = /** @class */ (function () {
    function Manifest() {
        this._id = '';
        this.name = '';
        this.version = '';
        this.author = '';
        this.description = '';
    }
    Object.defineProperty(Manifest.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    return Manifest;
}());
exports.Manifest = Manifest;
