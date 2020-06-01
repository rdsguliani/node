"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helloBuilder = function (name) { return ({ hello: name }); };
exports.helloHandler = function (req, res) {
    var params = req.params;
    var _a = params.name, name = _a === void 0 ? 'World' : _a;
    var response = helloBuilder(name);
    console.log(" in hellow owrld contorller ");
    return res.json(response);
};
//# sourceMappingURL=nameController.js.map