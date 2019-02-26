"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../generic/util");
exports.type = 'browser-jp2';
exports.label = 'Browser JPEG 2000';
exports.mimeType = 'image/jp2';
exports.extension = 'jp2';
exports.defaultOptions = {};
exports.featureTest = function () { return util_1.canvasEncodeTest(exports.mimeType); };
