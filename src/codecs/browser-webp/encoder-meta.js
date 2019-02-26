"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../generic/util");
exports.type = 'browser-webp';
exports.label = 'Browser WebP';
exports.mimeType = 'image/webp';
exports.extension = 'webp';
exports.defaultOptions = { quality: 0.75 };
exports.featureTest = function () { return util_1.canvasEncodeTest(exports.mimeType); };
