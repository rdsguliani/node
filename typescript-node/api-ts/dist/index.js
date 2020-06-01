"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var bodyParser = __importStar(require("body-parser"));
var shopppingRoute_1 = __importDefault(require("./routes/shopppingRoute"));
var logging_1 = __importDefault(require("./middlewares/logging"));
var app = new app_1.default({
    port: 3000,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        new logging_1.default().logger
    ],
    routes: [
        new shopppingRoute_1.default()
    ]
});
app.listen();
//# sourceMappingURL=index.js.map