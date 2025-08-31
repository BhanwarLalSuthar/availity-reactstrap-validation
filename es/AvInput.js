import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
const _excluded = ["errorMessage", "validate", "validationEvent", "state", "trueValue", "falseValue", "valueParser", "valueFormatter", "className", "tag", "getRef", "id"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import classNames from 'classnames';
import { Input } from 'reactstrap';
import AvBaseInput from './AvBaseInput';
import { jsx as _jsx } from "react/jsx-runtime";
export default class AvInput extends AvBaseInput {
  getValue() {
    return this.props.valueParser ? this.props.valueParser(this.value) : this.value;
  }
  getViewValue() {
    return this.props.valueFormatter ? this.props.valueFormatter(this.value) : this.value;
  }
  render() {
    const _this$props = this.props,
      {
        errorMessage: omit1,
        validate: omit2,
        validationEvent: omit3,
        state: omit4,
        trueValue: omit5,
        falseValue: omit6,
        valueParser: omit7,
        valueFormatter: omit8,
        className,
        tag,
        getRef,
        id = this.props.name
      } = _this$props,
      attributes = _objectWithoutProperties(_this$props, _excluded);
    const touched = this.context.FormCtrl.isTouched(this.props.name);
    const hasError = this.context.FormCtrl.hasError(this.props.name);
    let Tag = tag;
    if (Array.isArray(tag)) {
      let tags;
      // eslint-disable-next-line prefer-const
      [Tag, ...tags] = tag;
      attributes.tag = tags;
      if (attributes.tag.length <= 1) {
        attributes.tag = attributes.tag[0];
      }
    }
    const classes = classNames(className, touched ? 'is-touched' : 'is-untouched', this.context.FormCtrl.isDirty(this.props.name) ? 'is-dirty' : 'is-pristine', this.context.FormCtrl.isBad(this.props.name) ? 'is-bad-input' : null, hasError ? 'av-invalid' : 'av-valid', touched && hasError && 'is-invalid', attributes.type === 'checkbox' && touched && hasError && 'was-validated');
    const value = this.getViewValue();
    return /*#__PURE__*/_jsx(Tag, _objectSpread(_objectSpread(_objectSpread({}, attributes), {}, {
      ref: getRef
    }, this.getValidatorProps()), {}, {
      className: classes,
      value: value,
      id: id
    }));
  }
}
_defineProperty(AvInput, "defaultProps", Object.assign({}, AvBaseInput.defaultProps, {
  tag: Input
}));
_defineProperty(AvInput, "contextTypes", AvBaseInput.contextTypes);