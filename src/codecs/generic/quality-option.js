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
var style = __importStar(require("../../components/Options/style.scss"));
var range_1 = __importDefault(require("../../components/range"));
function qualityOption(opts) {
    if (opts === void 0) { opts = {}; }
    var _a = opts.min, min = _a === void 0 ? 0 : _a, _b = opts.max, max = _b === void 0 ? 100 : _b, _c = opts.step, step = _c === void 0 ? 1 : _c;
    var QualityOptions = /** @class */ (function (_super) {
        __extends(QualityOptions, _super);
        function QualityOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QualityOptions.prototype.onChange = function (event) {
            var el = event.currentTarget;
            this.props.onChange({ quality: Number(el.value) });
        };
        QualityOptions.prototype.render = function (_a) {
            var options = _a.options;
            return (<div class={style.optionsSection}>
          <div class={style.optionOneCell}>
            <range_1.default name="quality" min={min} max={max} step={step || 'any'} value={options.quality} onInput={this.onChange}>
              Quality:
            </range_1.default>
          </div>
        </div>);
        };
        __decorate([
            initial_util_1.bind
        ], QualityOptions.prototype, "onChange", null);
        return QualityOptions;
    }(preact_1.Component));
    return QualityOptions;
}
exports.default = qualityOption;
