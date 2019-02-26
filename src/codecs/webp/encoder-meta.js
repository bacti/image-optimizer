"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebPImageHint;
(function (WebPImageHint) {
    WebPImageHint[WebPImageHint["WEBP_HINT_DEFAULT"] = 0] = "WEBP_HINT_DEFAULT";
    WebPImageHint[WebPImageHint["WEBP_HINT_PICTURE"] = 1] = "WEBP_HINT_PICTURE";
    WebPImageHint[WebPImageHint["WEBP_HINT_PHOTO"] = 2] = "WEBP_HINT_PHOTO";
    WebPImageHint[WebPImageHint["WEBP_HINT_GRAPH"] = 3] = "WEBP_HINT_GRAPH";
})(WebPImageHint = exports.WebPImageHint || (exports.WebPImageHint = {}));
exports.type = 'webp';
exports.label = 'WebP';
exports.mimeType = 'image/webp';
exports.extension = 'webp';
// These come from struct WebPConfig in encode.h.
exports.defaultOptions = {
    quality: 75,
    target_size: 0,
    target_PSNR: 0,
    method: 4,
    sns_strength: 50,
    filter_strength: 60,
    filter_sharpness: 0,
    filter_type: 1,
    partitions: 0,
    segments: 4,
    pass: 1,
    show_compressed: 0,
    preprocessing: 0,
    autofilter: 0,
    partition_limit: 0,
    alpha_compression: 1,
    alpha_filtering: 1,
    alpha_quality: 100,
    lossless: 0,
    exact: 0,
    image_hint: 0,
    emulate_jpeg_size: 0,
    thread_level: 0,
    low_memory: 0,
    near_lossless: 100,
    use_delta_palette: 0,
    use_sharp_yuv: 0,
};
