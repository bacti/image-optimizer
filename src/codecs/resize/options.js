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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var linkstate_1 = __importDefault(require("linkstate"));
var initial_util_1 = require("../../lib/initial-util");
var util_1 = require("../../lib/util");
var style = __importStar(require("../../components/Options/style.scss"));
var checkbox_1 = __importDefault(require("../../components/checkbox"));
var expander_1 = __importDefault(require("../../components/expander"));
var select_1 = __importDefault(require("../../components/select"));
var ResizerOptions = /** @class */ (function (_super) {
    __extends(ResizerOptions, _super);
    function ResizerOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            maintainAspect: true,
        };
        return _this;
    }
    ResizerOptions.prototype.reportOptions = function () {
        var form = this.form;
        var width = form.width;
        var height = form.height;
        var options = this.props.options;
        if (!width.checkValidity() || !height.checkValidity())
            return;
        var newOptions = {
            width: util_1.inputFieldValueAsNumber(width),
            height: util_1.inputFieldValueAsNumber(height),
            method: form.resizeMethod.value,
            // Casting, as the formfield only returns the correct values.
            fitMethod: util_1.inputFieldValue(form.fitMethod, options.fitMethod),
        };
        this.props.onChange(newOptions);
    };
    ResizerOptions.prototype.onChange = function () {
        this.reportOptions();
    };
    ResizerOptions.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevState.maintainAspect && this.state.maintainAspect) {
            this.form.height.value = Math.round(Number(this.form.width.value) / this.props.aspect);
            this.reportOptions();
        }
    };
    ResizerOptions.prototype.onWidthInput = function () {
        if (this.state.maintainAspect) {
            var width = util_1.inputFieldValueAsNumber(this.form.width);
            this.form.height.value = Math.round(width / this.props.aspect);
        }
        this.reportOptions();
    };
    ResizerOptions.prototype.onHeightInput = function () {
        if (this.state.maintainAspect) {
            var height = util_1.inputFieldValueAsNumber(this.form.height);
            this.form.width.value = Math.round(height * this.props.aspect);
        }
        this.reportOptions();
    };
    ResizerOptions.prototype.render = function (_a, _b) {
        var options = _a.options, isVector = _a.isVector;
        var maintainAspect = _b.maintainAspect;
        return (<form ref={initial_util_1.linkRef(this, 'form')} class={style.optionsSection} onSubmit={util_1.preventDefault}>
        <label class={style.optionTextFirst}>
          Method:
          <select_1.default name="resizeMethod" value={options.method} onChange={this.onChange}>
            {isVector && <option value="vector">Vector</option>}
            <option value="browser-pixelated">Browser pixelated</option>
            <option value="browser-low">Browser low quality</option>
            <option value="browser-medium">Browser medium quality</option>
            <option value="browser-high">Browser high quality</option>
          </select_1.default>
        </label>
        <label class={style.optionTextFirst}>
          Width:
          <input required class={style.textField} name="width" type="number" min="1" value={'' + options.width} onInput={this.onWidthInput}/>
        </label>
        <label class={style.optionTextFirst}>
          Height:
          <input required class={style.textField} name="height" type="number" min="1" value={'' + options.height} onInput={this.onHeightInput}/>
        </label>
        <label class={style.optionInputFirst}>
          <checkbox_1.default name="maintainAspect" checked={maintainAspect} onChange={linkstate_1.default(this, 'maintainAspect')}/>
          Maintain aspect ratio
        </label>
        <expander_1.default>
          {maintainAspect ? null :
            <label class={style.optionTextFirst}>
              Fit method:
              <select_1.default name="fitMethod" value={options.fitMethod} onChange={this.onChange}>
                <option value="stretch">Stretch</option>
                <option value="contain">Contain</option>
              </select_1.default>
            </label>}
        </expander_1.default>
      </form>);
    };
    __decorate([
        initial_util_1.bind
    ], ResizerOptions.prototype, "onChange", null);
    __decorate([
        initial_util_1.bind
    ], ResizerOptions.prototype, "onWidthInput", null);
    __decorate([
        initial_util_1.bind
    ], ResizerOptions.prototype, "onHeightInput", null);
    return ResizerOptions;
}(preact_1.Component));
exports.default = ResizerOptions;
