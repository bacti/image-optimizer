"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initWasmModule(moduleFactory, wasmUrl) {
    return new Promise(function (resolve) {
        var module = moduleFactory({
            // Just to be safe, don't automatically invoke any wasm functions
            noInitialRun: true,
            locateFile: function (url) {
                // Redirect the request for the wasm binary to whatever webpack gave us.
                if (url.endsWith('.wasm'))
                    return wasmUrl;
                return url;
            },
            onRuntimeInitialized: function () {
                // An Emscripten is a then-able that resolves with itself, causing an infite loop when you
                // wrap it in a real promise. Delete the `then` prop solves this for now.
                // https://github.com/kripken/emscripten/issues/5820
                delete module.then;
                resolve(module);
            },
        });
    });
}
exports.initWasmModule = initWasmModule;
