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
var style = __importStar(require("../../components/Options/style.scss"));
var expander_1 = __importDefault(require("../../components/expander"));
var select_1 = __importDefault(require("../../components/select"));
var range_1 = __importDefault(require("../../components/range"));
var konamiPromise = util_1.konami();
var QuantizerOptions = /** @class */ (function (_super) {
    __extends(QuantizerOptions, _super);
    function QuantizerOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { extendedSettings: false };
        return _this;
    }
    QuantizerOptions.prototype.componentDidMount = function () {
        var _this = this;
        konamiPromise.then(function () {
            _this.setState({ extendedSettings: true });
        });
    };
    QuantizerOptions.prototype.onChange = function (event) {
        var form = event.currentTarget.closest('form');
        var options = this.props.options;
        var newOptions = {
            zx: util_1.inputFieldValueAsNumber(form.zx, options.zx),
            maxNumColors: util_1.inputFieldValueAsNumber(form.maxNumColors, options.maxNumColors),
            dither: util_1.inputFieldValueAsNumber(form.dither),
        };
        this.props.onChange(newOptions);
    };
    QuantizerOptions.prototype.render = function (_a, _b) {
        var options = _a.options;
        var extendedSettings = _b.extendedSettings;
        return (<form class={style.optionsSection} onSubmit={util_1.preventDefault}>
        <expander_1.default>
          {extendedSettings ?
            <label class={style.optionTextFirst}>
              Type:
              <select_1.default name="zx" value={'' + options.zx} onChange={this.onChange}>
                <option value="0">Standard</option>
                <option value="1">ZX</option>
              </select_1.default>
            </label>
            : null}
        </expander_1.default>
        <expander_1.default>
          {options.zx ? null :
            <div class={style.optionOneCell}>
              <range_1.default name="maxNumColors" min="2" max="256" value={options.maxNumColors} onInput={this.onChange}>
                Colors:
              </range_1.default>
            </div>}
        </expander_1.default>
        <div class={style.optionOneCell}>
          <range_1.default name="dither" min="0" max="1" step="0.01" value={options.dither} onInput={this.onChange}>
            Dithering:
          </range_1.default>
        </div>
      </form>);
    };
    __decorate([
        initial_util_1.bind
    ], QuantizerOptions.prototype, "onChange", null);
    return QuantizerOptions;
}(preact_1.Component));
exports.default = QuantizerOptions;
