"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../generic/util");
exports.type = 'browser-tiff';
exports.label = 'Browser TIFF';
exports.mimeType = 'image/tiff';
exports.extension = 'tiff';
exports.defaultOptions = {};
exports.featureTest = function () { return util_1.canvasEncodeTest(exports.mimeType); };
