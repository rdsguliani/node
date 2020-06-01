"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shoppingItems_1 = require("./../data/shoppingItems");
var ShoppingRoute = /** @class */ (function () {
    function ShoppingRoute() {
        this.router = express_1.Router();
        this.init();
    }
    ShoppingRoute.prototype.init = function () {
        this.router.get('/list', this.getList);
    };
    ShoppingRoute.prototype.getList = function (req, res) {
        res.send({ "data": shoppingItems_1.shoppingItems() });
    };
    return ShoppingRoute;
}());
exports.default = ShoppingRoute;
//# sourceMappingURL=shopppingRoute.js.map