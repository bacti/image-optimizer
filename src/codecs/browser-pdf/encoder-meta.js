"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../generic/util");
exports.type = 'browser-pdf';
exports.label = 'Browser PDF';
exports.mimeType = 'application/pdf';
exports.extension = 'pdf';
exports.defaultOptions = {};
exports.featureTest = function () { return util_1.canvasEncodeTest(exports.mimeType); };
