"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../lib/util");
function getContainOffsets(sw, sh, dw, dh) {
    var currentAspect = sw / sh;
    var endAspect = dw / dh;
    if (endAspect > currentAspect) {
        var newSh = sw / endAspect;
        var newSy = (sh - newSh) / 2;
        return { sw: sw, sh: newSh, sx: 0, sy: newSy };
    }
    var newSw = sh * endAspect;
    var newSx = (sw - newSw) / 2;
    return { sh: sh, sw: newSw, sx: newSx, sy: 0 };
}
function resize(data, opts) {
    var sx = 0;
    var sy = 0;
    var sw = data.width;
    var sh = data.height;
    if (opts.fitMethod === 'contain') {
        (_a = getContainOffsets(sw, sh, opts.width, opts.height), sx = _a.sx, sy = _a.sy, sw = _a.sw, sh = _a.sh);
    }
    return util_1.nativeResize(data, sx, sy, sw, sh, opts.width, opts.height, opts.method.slice('browser-'.length));
    var _a;
}
exports.resize = resize;
function vectorResize(data, opts) {
    var sx = 0;
    var sy = 0;
    var sw = data.width;
    var sh = data.height;
    if (opts.fitMethod === 'contain') {
        (_a = getContainOffsets(sw, sh, opts.width, opts.height), sx = _a.sx, sy = _a.sy, sw = _a.sw, sh = _a.sh);
    }
    return util_1.drawableToImageData(data, {
        sx: sx, sy: sy, sw: sw, sh: sh,
        width: opts.width, height: opts.height,
    });
    var _a;
}
exports.vectorResize = vectorResize;
