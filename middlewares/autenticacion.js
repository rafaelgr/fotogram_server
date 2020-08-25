"use strict";
exports.__esModule = true;
exports.verificaToken = void 0;
var token_1 = require("../classes/token");
exports.verificaToken = function (req, res, next) {
    var userToken = req.get('x-token') || '';
    token_1["default"].comprobarToken(userToken)
        .then(function (decoded) {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })["catch"](function (err) {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
