"use strict";
exports.__esModule = true;
var server_1 = require("./classes/server");
var mongoose_1 = require("mongoose");
var body_parser_1 = require("body-parser");
var express_fileupload_1 = require("express-fileupload");
var usuario_1 = require("./routes/usuario");
var post_1 = require("./routes/post");
var server = new server_1["default"]();
// Body parser
server.app.use(body_parser_1["default"].urlencoded({ extended: true }));
server.app.use(body_parser_1["default"].json());
// FileUpload
server.app.use(express_fileupload_1["default"]({ useTempFiles: true }));
// Rutas de mi app
server.app.use('/user', usuario_1["default"]);
server.app.use('/posts', post_1["default"]);
// Conectar DB
// 'mongodb://localhost:27017/fotosgram'
mongoose_1["default"].connect('mongodb+srv://rafa:aritel2010@cluster0-ofo4x.mongodb.net/fotosgram?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, function (err) {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.port);
});
