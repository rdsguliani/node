"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingMiddleware = /** @class */ (function () {
    function LoggingMiddleware() {
        this.logger = function (req, resp, next) {
            console.log('Request logged:', req.method, req.path);
            next();
        };
        //  this.init(); 
    }
    LoggingMiddleware.prototype.init = function () {
    };
    return LoggingMiddleware;
}());
exports.default = LoggingMiddleware;
//# sourceMappingURL=logging.js.map