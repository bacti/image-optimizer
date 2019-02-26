"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = 'WASM WebP Decoder';
var supportedMimeTypes = ['image/webp'];
function canHandleMimeType(mimeType) {
    return supportedMimeTypes.includes(mimeType);
}
exports.canHandleMimeType = canHandleMimeType;
