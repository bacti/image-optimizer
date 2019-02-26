"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var initial_util_1 = require("../../lib/initial-util");
var util_1 = require("../../lib/util");
var encoder_meta_1 = require("./encoder-meta");
var style = __importStar(require("../../components/Options/style.scss"));
var checkbox_1 = __importDefault(require("../../components/checkbox"));
var expander_1 = __importDefault(require("../../components/expander"));
var select_1 = __importDefault(require("../../components/select"));
var range_1 = __importDefault(require("../../components/range"));
var linkstate_1 = __importDefault(require("linkstate"));
var MozJPEGEncoderOptions = /** @class */ (function (_super) {
    __extends(MozJPEGEncoderOptions, _super);
    function MozJPEGEncoderOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showAdvanced: false,
        };
        return _this;
    }
    MozJPEGEncoderOptions.prototype.onChange = function (event) {
        var form = event.currentTarget.closest('form');
        var options = this.props.options;
        var newOptions = __assign({}, this.props.options, { 
            // And now stuff from the form:
            // .checked
            baseline: util_1.inputFieldChecked(form.baseline, options.baseline), progressive: util_1.inputFieldChecked(form.progressive, options.progressive), optimize_coding: util_1.inputFieldChecked(form.optimize_coding, options.optimize_coding), trellis_multipass: util_1.inputFieldChecked(form.trellis_multipass, options.trellis_multipass), trellis_opt_zero: util_1.inputFieldChecked(form.trellis_opt_zero, options.trellis_opt_zero), trellis_opt_table: util_1.inputFieldChecked(form.trellis_opt_table, options.trellis_opt_table), auto_subsample: util_1.inputFieldChecked(form.auto_subsample, options.auto_subsample), separate_chroma_quality: util_1.inputFieldChecked(form.separate_chroma_quality, options.separate_chroma_quality), 
            // .value
            quality: util_1.inputFieldValueAsNumber(form.quality, options.quality), chroma_quality: util_1.inputFieldValueAsNumber(form.chroma_quality, options.chroma_quality), chroma_subsample: util_1.inputFieldValueAsNumber(form.chroma_subsample, options.chroma_subsample), smoothing: util_1.inputFieldValueAsNumber(form.smoothing, options.smoothing), color_space: util_1.inputFieldValueAsNumber(form.color_space, options.color_space), quant_table: util_1.inputFieldValueAsNumber(form.quant_table, options.quant_table), trellis_loops: util_1.inputFieldValueAsNumber(form.trellis_loops, options.trellis_loops) });
        this.props.onChange(newOptions);
    };
    MozJPEGEncoderOptions.prototype.render = function (_a, _b) {
        var options = _a.options;
        var showAdvanced = _b.showAdvanced;
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (<form class={style.optionsSection} onSubmit={util_1.preventDefault}>
        <div class={style.optionOneCell}>
          <range_1.default name="quality" min="0" max="100" value={options.quality} onInput={this.onChange}>
            Quality:
          </range_1.default>
        </div>
        <label class={style.optionInputFirst}>
          <checkbox_1.default checked={showAdvanced} onChange={linkstate_1.default(this, 'showAdvanced')}/>
          Show advanced settings
        </label>
        <expander_1.default>
          {showAdvanced ?
            <div>
              <label class={style.optionTextFirst}>
                Channels:
                <select_1.default name="color_space" value={options.color_space} onChange={this.onChange}>
                  <option value={encoder_meta_1.MozJpegColorSpace.GRAYSCALE}>Grayscale</option>
                  <option value={encoder_meta_1.MozJpegColorSpace.RGB}>RGB</option>
                  <option value={encoder_meta_1.MozJpegColorSpace.YCbCr}>YCbCr</option>
                </select_1.default>
              </label>
              <expander_1.default>
                {options.color_space === encoder_meta_1.MozJpegColorSpace.YCbCr ?
                <div>
                    <label class={style.optionInputFirst}>
                      <checkbox_1.default name="auto_subsample" checked={options.auto_subsample} onChange={this.onChange}/>
                      Auto subsample chroma
                    </label>
                    <expander_1.default>
                      {options.auto_subsample ? null :
                    <div class={style.optionOneCell}>
                          <range_1.default name="chroma_subsample" min="1" max="4" value={options.chroma_subsample} onInput={this.onChange}>
                            Subsample chroma by:
                          </range_1.default>
                        </div>}
                    </expander_1.default>
                    <label class={style.optionInputFirst}>
                      <checkbox_1.default name="separate_chroma_quality" checked={options.separate_chroma_quality} onChange={this.onChange}/>
                      Separate chroma quality
                    </label>
                    <expander_1.default>
                      {options.separate_chroma_quality ?
                    <div class={style.optionOneCell}>
                          <range_1.default name="chroma_quality" min="0" max="100" value={options.chroma_quality} onInput={this.onChange}>
                            Chroma quality:
                          </range_1.default>
                        </div>
                    : null}
                    </expander_1.default>
                  </div>
                : null}
              </expander_1.default>
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="baseline" checked={options.baseline} onChange={this.onChange}/>
                Pointless spec compliance
              </label>
              <expander_1.default>
                {options.baseline ? null :
                <label class={style.optionInputFirst}>
                    <checkbox_1.default name="progressive" checked={options.progressive} onChange={this.onChange}/>
                    Progressive rendering
                  </label>}
              </expander_1.default>
              <expander_1.default>
                {options.baseline ?
                <label class={style.optionInputFirst}>
                    <checkbox_1.default name="optimize_coding" checked={options.optimize_coding} onChange={this.onChange}/>
                    Optimize Huffman table
                  </label>
                : null}
              </expander_1.default>
              <div class={style.optionOneCell}>
                <range_1.default name="smoothing" min="0" max="100" value={options.smoothing} onInput={this.onChange}>
                  Smoothing:
                </range_1.default>
              </div>
              <label class={style.optionTextFirst}>
                Quantization:
                <select_1.default name="quant_table" value={options.quant_table} onChange={this.onChange}>
                  <option value="0">JPEG Annex K</option>
                  <option value="1">Flat</option>
                  <option value="2">MSSIM-tuned Kodak</option>
                  <option value="3">ImageMagick</option>
                  <option value="4">PSNR-HVS-M-tuned Kodak</option>
                  <option value="5">Klein et al</option>
                  <option value="6">Watson et al</option>
                  <option value="7">Ahumada et al</option>
                  <option value="8">Peterson et al</option>
                </select_1.default>
              </label>
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="trellis_multipass" checked={options.trellis_multipass} onChange={this.onChange}/>
                Trellis multipass
              </label>
              <expander_1.default>
                {options.trellis_multipass ?
                <label class={style.optionInputFirst}>
                    <checkbox_1.default name="trellis_opt_zero" checked={options.trellis_opt_zero} onChange={this.onChange}/>
                    Optimize zero block runs
                  </label>
                : null}
              </expander_1.default>
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="trellis_opt_table" checked={options.trellis_opt_table} onChange={this.onChange}/>
                Optimize after trellis quantization
              </label>
              <div class={style.optionOneCell}>
                <range_1.default name="trellis_loops" min="1" max="50" value={options.trellis_loops} onInput={this.onChange}>
                  Trellis quantization passes:
                </range_1.default>
              </div>
            </div>
            : null}
        </expander_1.default>
      </form>);
    };
    __decorate([
        initial_util_1.bind
    ], MozJPEGEncoderOptions.prototype, "onChange", null);
    return MozJPEGEncoderOptions;
}(preact_1.Component));
exports.default = MozJPEGEncoderOptions;
