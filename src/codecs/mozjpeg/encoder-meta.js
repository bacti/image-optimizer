"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MozJpegColorSpace;
(function (MozJpegColorSpace) {
    MozJpegColorSpace[MozJpegColorSpace["GRAYSCALE"] = 1] = "GRAYSCALE";
    MozJpegColorSpace[MozJpegColorSpace["RGB"] = 2] = "RGB";
    MozJpegColorSpace[MozJpegColorSpace["YCbCr"] = 3] = "YCbCr";
})(MozJpegColorSpace = exports.MozJpegColorSpace || (exports.MozJpegColorSpace = {}));
exports.type = 'mozjpeg';
exports.label = 'MozJPEG';
exports.mimeType = 'image/jpeg';
exports.extension = 'jpg';
exports.defaultOptions = {
    quality: 75,
    baseline: false,
    arithmetic: false,
    progressive: true,
    optimize_coding: true,
    smoothing: 0,
    color_space: MozJpegColorSpace.YCbCr,
    quant_table: 3,
    trellis_multipass: false,
    trellis_opt_zero: false,
    trellis_opt_table: false,
    trellis_loops: 1,
    auto_subsample: true,
    chroma_subsample: 2,
    separate_chroma_quality: false,
    chroma_quality: 75,
};
