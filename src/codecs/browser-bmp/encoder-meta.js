"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../generic/util");
exports.type = 'browser-bmp';
exports.label = 'Browser BMP';
exports.mimeType = 'image/bmp';
exports.extension = 'bmp';
exports.defaultOptions = {};
exports.featureTest = function () { return util_1.canvasEncodeTest(exports.mimeType); };
