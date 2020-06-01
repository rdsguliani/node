"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as express from 'express'
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    // constructor(config: {port: number, middleWares:any, controllers: any}) {
    function App(appInit) {
        this.app = express_1.default();
        this.port = appInit.port;
        this.initMiddleWares(appInit.middleWares);
        this.initRoutes(appInit.routes);
    }
    App.prototype.initMiddleWares = function (middleWares) {
        var _this = this;
        middleWares.forEach(function (middleWare) {
            _this.app.use(middleWare);
        });
    };
    App.prototype.initRoutes = function (routes) {
        var _this = this;
        routes.forEach(function (route) {
            _this.app.use('/', route.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the http://localhost:" + _this.port);
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map