"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var nameController_1 = require("./../controllers/nameController");
var NameRoutes = /** @class */ (function () {
    function NameRoutes() {
        this.router = express.Router();
        console.log("in names routes");
        this.router.get('/:name', nameController_1.helloHandler);
    }
    return NameRoutes;
}());
exports.NameRoutes = NameRoutes;
//# sourceMappingURL=nameRoutes.js.map