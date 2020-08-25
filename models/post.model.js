"use strict";
exports.__esModule = true;
exports.Post = void 0;
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
            type: String
        }],
    coords: {
        type: String // -13.313123, 12.3123123
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = mongoose_1.model('Post', postSchema);
