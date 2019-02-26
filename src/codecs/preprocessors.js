"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var processor_meta_1 = require("./imagequant/processor-meta");
var processor_meta_2 = require("./resize/processor-meta");
exports.defaultPreprocessorState = {
    quantizer: __assign({ enabled: false }, processor_meta_1.defaultOptions),
    resize: __assign({ enabled: false }, processor_meta_2.defaultOptions),
};
