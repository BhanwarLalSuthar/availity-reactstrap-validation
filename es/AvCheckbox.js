import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
const _excluded = ["className", "id"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import find from 'lodash/find';
import { Input, FormGroup, Label } from 'reactstrap';
import AvInput from './AvInput';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const checkPropTypes = Object.assign({}, AvInput.propTypes);
delete checkPropTypes.name;
export default class AvCheckbox extends Component {
  constructor() {
    var _this;
    super(...arguments);
    _this = this;
    _defineProperty(this, "onChangeHandler", function (event) {
      _this.context.Group.update(event, _this.props.value);
      if (_this.props.onChange) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this.props.onChange(event, ...args);
      }
    });
  }
  componentDidMount() {
    this.context.FormCtrl && this.context.FormCtrl.register(this);
  }
  componentWillUnmount() {
    this.context.FormCtrl && this.context.FormCtrl.unregister(this);
  }
  isDefaultChecked(valueArr) {
    return Array.isArray(valueArr) && valueArr.length > 0 && find(valueArr, item => item === this.props.value);
  }
  render() {
    const _this$props = this.props,
      {
        className,
        id
      } = _this$props,
      attributes = _objectWithoutProperties(_this$props, _excluded);
    const groupProps = this.context.Group.getProps();
    const touched = this.context.FormCtrl.isTouched(groupProps.name);
    const hasError = this.context.FormCtrl.hasError(groupProps.name);
    const classes = classNames(className, touched ? 'is-touched' : 'is-untouched', this.context.FormCtrl.isDirty(groupProps.name) ? 'is-dirty' : 'is-pristine', this.context.FormCtrl.isBad(groupProps.name) ? 'is-bad-input' : null, hasError ? 'av-invalid' : 'av-valid', touched && hasError && 'is-invalid');
    if (this.props.disabled === undefined && this.context.FormCtrl.isDisabled() !== undefined) {
      attributes.disabled = this.context.FormCtrl.isDisabled();
    }
    if (this.props.readOnly === undefined && this.context.FormCtrl.isReadOnly() !== undefined) {
      attributes.disabled = attributes.disabled || this.context.FormCtrl.isReadOnly();
    }
    return /*#__PURE__*/_jsxs(FormGroup, {
      check: true,
      inline: groupProps.inline,
      disabled: attributes.disabled || attributes.readOnly,
      children: [/*#__PURE__*/_jsx(Input, _objectSpread(_objectSpread({
        name: groupProps.name,
        type: "checkbox"
      }, attributes), {}, {
        id: id || "checkbox-".concat(groupProps.name, "-").concat(this.props.value),
        className: classes,
        onChange: this.onChangeHandler,
        value: this.props.value && this.props.value.toString(),
        defaultChecked: this.isDefaultChecked(groupProps.value),
        required: groupProps.required
      })), /*#__PURE__*/_jsx(Label, {
        check: true,
        for: id || "checkbox-".concat(groupProps.name, "-").concat(this.props.value),
        children: this.props.label
      })]
    });
  }
}
_defineProperty(AvCheckbox, "contextTypes", Object.assign({}, AvInput.contextTypes, {
  Group: PropTypes.object.isRequired
}));
_defineProperty(AvCheckbox, "propTypes", checkPropTypes);