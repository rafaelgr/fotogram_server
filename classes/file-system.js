"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var uniqid_1 = require("uniqid");
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    ;
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Crear carpetas
            var path = _this.crearCarpetaUsuario(userId);
            // Nombre archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(path + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        // 6.copy.jpg
        var nombreArr = nombreOriginal.split('.');
        var extension = nombreArr[nombreArr.length - 1];
        var idUnico = uniqid_1["default"]();
        return idUnico + "." + extension;
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var pathUser = path_1["default"].resolve(__dirname, '../uploads/', userId);
        var pathUserTemp = pathUser + '/temp';
        // console.log(pathUser);
        var existe = fs_1["default"].existsSync(pathUser);
        if (!existe) {
            fs_1["default"].mkdirSync(pathUser);
            fs_1["default"].mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    };
    FileSystem.prototype.imagenesDeTempHaciaPost = function (userId) {
        var pathTemp = path_1["default"].resolve(__dirname, '../uploads/', userId, 'temp');
        var pathPost = path_1["default"].resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1["default"].existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1["default"].existsSync(pathPost)) {
            fs_1["default"].mkdirSync(pathPost);
        }
        var imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(function (imagen) {
            fs_1["default"].renameSync(pathTemp + "/" + imagen, pathPost + "/" + imagen);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.obtenerImagenesEnTemp = function (userId) {
        var pathTemp = path_1["default"].resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1["default"].readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.getFotoUrl = function (userId, img) {
        // Path POSTs
        var pathFoto = path_1["default"].resolve(__dirname, '../uploads', userId, 'posts', img);
        // Si la imagen existe
        var existe = fs_1["default"].existsSync(pathFoto);
        if (!existe) {
            return path_1["default"].resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    };
    return FileSystem;
}());
exports["default"] = FileSystem;
