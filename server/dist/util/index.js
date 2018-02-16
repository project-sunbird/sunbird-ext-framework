"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
var shortHash = require("short-hash");
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.hash = function (text) {
        return shortHash(text);
    };
    return Util;
}());
exports.Util = Util;
