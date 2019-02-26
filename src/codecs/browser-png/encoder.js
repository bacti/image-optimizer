"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encoder_meta_1 = require("./encoder-meta");
var util_1 = require("../../lib/util");
function encode(data) {
    return util_1.canvasEncode(data, encoder_meta_1.mimeType);
}
exports.encode = encode;
