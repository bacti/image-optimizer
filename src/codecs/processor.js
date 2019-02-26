"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var comlink_1 = require("comlink");
var util_1 = require("../lib/util");
var processor_1 = require("./resize/processor");
var browserBMP = __importStar(require("./browser-bmp/encoder"));
var browserPNG = __importStar(require("./browser-png/encoder"));
var browserJPEG = __importStar(require("./browser-jpeg/encoder"));
var browserWebP = __importStar(require("./browser-webp/encoder"));
var browserGIF = __importStar(require("./browser-gif/encoder"));
var browserTIFF = __importStar(require("./browser-tiff/encoder"));
var browserJP2 = __importStar(require("./browser-jp2/encoder"));
var browserPDF = __importStar(require("./browser-pdf/encoder"));
('./processor-worker').ProcessorWorkerApi;
/** How long the worker should be idle before terminating. */
var workerTimeout = 10000;
var Processor = /** @class */ (function () {
    function Processor() {
        /** Is work currently happening? */
        this._busy = false;
        /** Incementing ID so we can tell if a job has been superseded. */
        this._latestJobId = 0;
        /** setTimeout ID for killing the worker when idle. */
        this._workerTimeoutId = 0;
    }
    /**
     * Decorator that manages the (re)starting of the worker and aborting existing jobs. Not all
     * processing jobs require a worker (e.g. the main thread canvas encodes), use the needsWorker
     * option to control this.
     */
    Processor._processingJob = function (options) {
        if (options === void 0) { options = {}; }
        var _a = options.needsWorker, needsWorker = _a === void 0 ? false : _a;
        return function (target, propertyKey, descriptor) {
            var processingFunc = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var jobId, returnVal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this._latestJobId += 1;
                                jobId = this._latestJobId;
                                this.abortCurrent();
                                if (needsWorker)
                                    self.clearTimeout(this._workerTimeoutId);
                                if (!this._worker && needsWorker) {
                                    // worker-loader does magic here.
                                    // @ts-ignore - Typescript doesn't know about the 2nd param to new Worker, and the
                                    // definition can't be overwritten.
                                    this._worker = new Worker('./processor-worker', { name: 'processor-worker', type: 'module' });
                                    // Need to do some TypeScript trickery to make the type match.
                                    this._workerApi = comlink_1.proxy(this._worker);
                                }
                                this._busy = true;
                                returnVal = Promise.race([
                                    processingFunc.call.apply(processingFunc, [this].concat(args)),
                                    new Promise(function (_, reject) { _this._abortRejector = reject; }),
                                ]);
                                // Wait for the operation to settle.
                                return [4 /*yield*/, returnVal.catch(function () { })];
                            case 1:
                                // Wait for the operation to settle.
                                _a.sent();
                                // If no other jobs are happening, cleanup.
                                if (jobId === this._latestJobId)
                                    this._jobCleanup();
                                return [2 /*return*/, returnVal];
                        }
                    });
                });
            };
        };
    };
    Processor.prototype._jobCleanup = function () {
        var _this = this;
        this._busy = false;
        if (!this._worker)
            return;
        // If the worker is unused for 10 seconds, remove it to save memory.
        this._workerTimeoutId = self.setTimeout(function () {
            if (!_this._worker)
                return;
            _this._worker.terminate();
            _this._worker = undefined;
        }, workerTimeout);
    };
    /** Abort the current job, if any */
    Processor.prototype.abortCurrent = function () {
        if (!this._busy)
            return;
        if (!this._abortRejector)
            throw Error("There must be a rejector if it's busy");
        this._abortRejector(new DOMException('Aborted', 'AbortError'));
        this._abortRejector = undefined;
        this._busy = false;
        if (!this._worker)
            return;
        this._worker.terminate();
        this._worker = undefined;
    };
    // Off main thread jobs:
    Processor.prototype.imageQuant = function (data, opts) {
        return this._workerApi.quantize(data, opts);
    };
    __decorate([
        Processor._processingJob({ needsWorker: true })
    ], Processor.prototype, "imageQuant", null);
    __decorate([
        Processor._processingJob({ needsWorker: true })
    ], Processor.prototype, "rotate", null);
    return Processor;
}());
exports.default = Processor;
('./rotate/processor-meta').RotateOptions,
;
Promise < ImageData > {
    return: this._workerApi.rotate(data, opts)
};
mozjpegEncode(data, ImageData, opts, MozJPEGEncoderOptions);
Promise < ArrayBuffer > {
    return: this._workerApi.mozjpegEncode(data, opts)
};
optiPngEncode(data, ImageData, opts, OptiPNGEncoderOptions);
Promise < ArrayBuffer > {
    // OptiPNG expects PNG input.
    const: pngBlob = yield util_1.canvasEncode(data, 'image/png'),
    const: pngBuffer = yield util_1.blobToArrayBuffer(pngBlob),
    return: this._workerApi.optiPngEncode(pngBuffer, opts)
};
webpEncode(data, ImageData, opts, WebPEncoderOptions);
Promise < ArrayBuffer > {
    return: this._workerApi.webpEncode(data, opts)
};
webpDecode(blob, Blob);
Promise < ImageData > {
    const: data = yield util_1.blobToArrayBuffer(blob),
    return: this._workerApi.webpDecode(data)
};
// Not-worker jobs:
browserBmpEncode(data, ImageData);
Promise < Blob > {
    return: browserBMP.encode(data)
};
browserPngEncode(data, ImageData);
Promise < Blob > {
    return: browserPNG.encode(data)
};
browserJpegEncode(data, ImageData, opts, BrowserJPEGOptions);
Promise < Blob > {
    return: browserJPEG.encode(data, opts)
};
browserWebpEncode(data, ImageData, opts, BrowserWebpEncodeOptions);
Promise < Blob > {
    return: browserWebP.encode(data, opts)
};
browserGifEncode(data, ImageData);
Promise < Blob > {
    return: browserGIF.encode(data)
};
browserTiffEncode(data, ImageData);
Promise < Blob > {
    return: browserTIFF.encode(data)
};
browserJp2Encode(data, ImageData);
Promise < Blob > {
    return: browserJP2.encode(data)
};
browserPdfEncode(data, ImageData);
Promise < Blob > {
    return: browserPDF.encode(data)
};
// Synchronous jobs
processor_1.resize(data, ImageData, opts, BitmapResizeOptions);
{
    this.abortCurrent();
    return processor_1.resize(data, opts);
}
processor_1.vectorResize(data, HTMLImageElement, opts, VectorResizeOptions);
{
    this.abortCurrent();
    return processor_1.vectorResize(data, opts);
}
