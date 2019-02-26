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
var initial_util_1 = require("../../lib/initial-util");
var util_1 = require("../../lib/util");
var range_1 = __importDefault(require("../../components/range"));
var style = __importStar(require("../../components/Options/style.scss"));
var OptiPNGEncoderOptions = /** @class */ (function (_super) {
    __extends(OptiPNGEncoderOptions, _super);
    function OptiPNGEncoderOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OptiPNGEncoderOptions.prototype.onChange = function (event) {
        var form = event.currentTarget.closest('form');
        var options = {
            level: util_1.inputFieldValueAsNumber(form.level),
        };
        this.props.onChange(options);
    };
    OptiPNGEncoderOptions.prototype.render = function (_a) {
        var options = _a.options;
        return (<form class={style.optionsSection} onSubmit={util_1.preventDefault}>
        <div class={style.optionOneCell}>
          <range_1.default name="level" min="0" max="7" step="1" value={options.level} onInput={this.onChange}>
            Effort:
          </range_1.default>
        </div>
      </form>);
    };
    __decorate([
        initial_util_1.bind
    ], OptiPNGEncoderOptions.prototype, "onChange", null);
    return OptiPNGEncoderOptions;
}(preact_1.Component));
exports.default = OptiPNGEncoderOptions;
