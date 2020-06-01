"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var handlers_1 = require("./handlers");
var nameRoutes_1 = require("./routes/nameRoutes");
var Index = /** @class */ (function () {
    function Index() {
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.app = express_1.default();
        this.namesRoute = new nameRoutes_1.NameRoutes();
        this.mapRoutes();
    }
    Index.prototype.mapRoutes = function () {
        var _this = this;
        this.app.use(function (req, res, next) {
            // console.log(req);
            next();
        });
        this.app.get('/', handlers_1.rootHandler);
        this.app.use('/hello', this.namesRoute.router);
        this.app.listen(this.port, function (err) {
            if (err)
                return console.error(err);
            return console.log("Server is listening on " + _this.port);
        });
    };
    return Index;
}());
exports = new Index();
//# sourceMappingURL=index.js.map