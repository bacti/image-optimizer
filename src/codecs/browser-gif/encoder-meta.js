"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../generic/util");
exports.type = 'browser-gif';
exports.label = 'Browser GIF';
exports.mimeType = 'image/gif';
exports.extension = 'gif';
exports.defaultOptions = {};
exports.featureTest = function () { return util_1.canvasEncodeTest(exports.mimeType); };
