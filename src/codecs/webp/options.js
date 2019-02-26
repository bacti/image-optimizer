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
// From kLosslessPresets in config_enc.c
// The format is [method, quality].
var losslessPresets = [
    [0, 0], [1, 20], [2, 25], [3, 30], [3, 50],
    [4, 50], [4, 75], [4, 90], [5, 90], [6, 100],
];
var losslessPresetDefault = 6;
function determineLosslessQuality(quality, method) {
    var index = losslessPresets.findIndex(function (_a) {
        var presetMethod = _a[0], presetQuality = _a[1];
        return presetMethod === method && presetQuality === quality;
    });
    if (index !== -1)
        return index;
    // Quality doesn't match one of the presets.
    // This can happen when toggling 'lossless'.
    return losslessPresetDefault;
}
var WebPEncoderOptions = /** @class */ (function (_super) {
    __extends(WebPEncoderOptions, _super);
    function WebPEncoderOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showAdvanced: false,
        };
        return _this;
    }
    WebPEncoderOptions.prototype.onChange = function (event) {
        var form = event.currentTarget.closest('form');
        var lossless = util_1.inputFieldCheckedAsNumber(form.lossless);
        var options = this.props.options;
        var losslessPresetValue = util_1.inputFieldValueAsNumber(form.lossless_preset, determineLosslessQuality(options.quality, options.method));
        var newOptions = __assign({}, options, { 
            // And now stuff from the form:
            lossless: lossless, 
            // Special-cased inputs:
            // In lossless mode, the quality is derived from the preset.
            quality: lossless ?
                losslessPresets[losslessPresetValue][1] :
                util_1.inputFieldValueAsNumber(form.quality, options.quality), 
            // In lossless mode, the method is derived from the preset.
            method: lossless ?
                losslessPresets[losslessPresetValue][0] :
                util_1.inputFieldValueAsNumber(form.method_input, options.method), image_hint: util_1.inputFieldCheckedAsNumber(form.image_hint, options.image_hint) ?
                encoder_meta_1.WebPImageHint.WEBP_HINT_GRAPH :
                encoder_meta_1.WebPImageHint.WEBP_HINT_DEFAULT, 
            // .checked
            exact: util_1.inputFieldCheckedAsNumber(form.exact, options.exact), alpha_compression: util_1.inputFieldCheckedAsNumber(form.alpha_compression, options.alpha_compression), autofilter: util_1.inputFieldCheckedAsNumber(form.autofilter, options.autofilter), filter_type: util_1.inputFieldCheckedAsNumber(form.filter_type, options.filter_type), use_sharp_yuv: util_1.inputFieldCheckedAsNumber(form.use_sharp_yuv, options.use_sharp_yuv), 
            // .value
            near_lossless: 100 - util_1.inputFieldValueAsNumber(form.near_lossless, 100 - options.near_lossless), alpha_quality: util_1.inputFieldValueAsNumber(form.alpha_quality, options.alpha_quality), alpha_filtering: util_1.inputFieldValueAsNumber(form.alpha_filtering, options.alpha_filtering), sns_strength: util_1.inputFieldValueAsNumber(form.sns_strength, options.sns_strength), filter_strength: util_1.inputFieldValueAsNumber(form.filter_strength, options.filter_strength), filter_sharpness: 7 - util_1.inputFieldValueAsNumber(form.filter_sharpness, 7 - options.filter_sharpness), pass: util_1.inputFieldValueAsNumber(form.pass, options.pass), preprocessing: util_1.inputFieldValueAsNumber(form.preprocessing, options.preprocessing), segments: util_1.inputFieldValueAsNumber(form.segments, options.segments), partitions: util_1.inputFieldValueAsNumber(form.partitions, options.partitions) });
        this.props.onChange(newOptions);
    };
    WebPEncoderOptions.prototype._losslessSpecificOptions = function (options) {
        return (<div key="lossless">
        <div class={style.optionOneCell}>
          <range_1.default name="lossless_preset" min="0" max="9" value={determineLosslessQuality(options.quality, options.method)} onInput={this.onChange}>
            Effort:
          </range_1.default>
        </div>
        <div class={style.optionOneCell}>
          <range_1.default name="near_lossless" min="0" max="100" value={'' + (100 - options.near_lossless)} onInput={this.onChange}>
            Slight loss:
          </range_1.default>
        </div>
        <label class={style.optionInputFirst}>
          
          <checkbox_1.default name="image_hint" checked={options.image_hint === encoder_meta_1.WebPImageHint.WEBP_HINT_GRAPH} onChange={this.onChange}/>
          Discrete tone image
        </label>
      </div>);
    };
    WebPEncoderOptions.prototype._lossySpecificOptions = function (options) {
        var showAdvanced = this.state.showAdvanced;
        return (<div key="lossy">
        <div class={style.optionOneCell}>
          <range_1.default name="method_input" min="0" max="6" value={options.method} onInput={this.onChange}>
            Effort:
          </range_1.default>
        </div>
        <div class={style.optionOneCell}>
          <range_1.default name="quality" min="0" max="100" step="0.1" value={options.quality} onInput={this.onChange}>
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
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="alpha_compression" checked={!!options.alpha_compression} onChange={this.onChange}/>
                Compress alpha
              </label>
              <div class={style.optionOneCell}>
                <range_1.default name="alpha_quality" min="0" max="100" value={options.alpha_quality} onInput={this.onChange}>
                  Alpha quality:
                </range_1.default>
              </div>
              <div class={style.optionOneCell}>
                <range_1.default name="alpha_filtering" min="0" max="2" value={options.alpha_filtering} onInput={this.onChange}>
                  Alpha filter quality:
                </range_1.default>
              </div>
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="autofilter" checked={!!options.autofilter} onChange={this.onChange}/>
                Auto adjust filter strength
              </label>
              <expander_1.default>
                {options.autofilter ? null :
                <div class={style.optionOneCell}>
                    <range_1.default name="filter_strength" min="0" max="100" value={options.filter_strength} onInput={this.onChange}>
                      Filter strength:
                    </range_1.default>
                  </div>}
              </expander_1.default>
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="filter_type" checked={!!options.filter_type} onChange={this.onChange}/>
                Strong filter
              </label>
              <div class={style.optionOneCell}>
                <range_1.default name="filter_sharpness" min="0" max="7" value={7 - options.filter_sharpness} onInput={this.onChange}>
                  Filter sharpness:
                </range_1.default>
              </div>
              <label class={style.optionInputFirst}>
                <checkbox_1.default name="use_sharp_yuv" checked={!!options.use_sharp_yuv} onChange={this.onChange}/>
                Sharp RGB→YUV conversion
              </label>
              <div class={style.optionOneCell}>
                <range_1.default name="pass" min="1" max="10" value={options.pass} onInput={this.onChange}>
                  Passes:
                </range_1.default>
              </div>
              <div class={style.optionOneCell}>
                <range_1.default name="sns_strength" min="0" max="100" value={options.sns_strength} onInput={this.onChange}>
                  Spacial noise shaping:
                </range_1.default>
              </div>
              <label class={style.optionTextFirst}>
                Preprocess:
                <select_1.default name="preprocessing" value={options.preprocessing} onChange={this.onChange}>
                  <option value="0">None</option>
                  <option value="1">Segment smooth</option>
                  <option value="2">Pseudo-random dithering</option>
                </select_1.default>
              </label>
              <div class={style.optionOneCell}>
                <range_1.default name="segments" min="1" max="4" value={options.segments} onInput={this.onChange}>
                  Segments:
                </range_1.default>
              </div>
              <div class={style.optionOneCell}>
                <range_1.default name="partitions" min="0" max="3" value={options.partitions} onInput={this.onChange}>
                  Partitions:
                </range_1.default>
              </div>
            </div>
            : null}
        </expander_1.default>
      </div>);
    };
    WebPEncoderOptions.prototype.render = function (_a) {
        var options = _a.options;
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (<form class={style.optionsSection} onSubmit={util_1.preventDefault}>
        <label class={style.optionInputFirst}>
          <checkbox_1.default name="lossless" checked={!!options.lossless} onChange={this.onChange}/>
          Lossless
        </label>
        {options.lossless
            ? this._losslessSpecificOptions(options)
            : this._lossySpecificOptions(options)}
        <label class={style.optionInputFirst}>
          <checkbox_1.default name="exact" checked={!!options.exact} onChange={this.onChange}/>
          Preserve transparent data
        </label>
      </form>);
    };
    __decorate([
        initial_util_1.bind
    ], WebPEncoderOptions.prototype, "onChange", null);
    return WebPEncoderOptions;
}(preact_1.Component));
exports.default = WebPEncoderOptions;
