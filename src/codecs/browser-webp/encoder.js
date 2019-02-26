"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encoder_meta_1 = require("./encoder-meta");
var util_1 = require("../../lib/util");
function encode(data, _a) {
    var quality = _a.quality;
    return util_1.canvasEncode(data, encoder_meta_1.mimeType, quality);
}
exports.encode = encode;
