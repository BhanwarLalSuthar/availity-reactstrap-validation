import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
const _excluded = ["helpMessage", "label", "labelHidden", "inputClass", "labelClass", "children", "id", "size", "disabled", "readOnly", "grid", "labelAttrs", "groupAttrs"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { Component } from 'react';
import PropTypes from 'prop-types';
import AvInput from './AvInput';
import AvGroup from './AvGroup';
import AvFeedback from './AvFeedback';
import { Col, FormText, Label } from 'reactstrap';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
export default class AvField extends Component {
  getChildContext() {
    var _this = this;
    this.FormCtrl = _objectSpread({}, this.context.FormCtrl);
    const registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = function (input) {
      let updater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : input && input.setState && input.setState.bind(input);
      registerValidator(input, () => {
        _this.setState({});
        if (updater) updater({});
      });
    };
    return {
      FormCtrl: this.FormCtrl
    };
  }
  render() {
    let row = false;
    const col = {};
    const labelCol = {};
    const _this$props = this.props,
      {
        helpMessage,
        label,
        labelHidden,
        inputClass,
        labelClass,
        children,
        id = this.props.name,
        size,
        disabled,
        readOnly,
        grid,
        labelAttrs,
        groupAttrs
      } = _this$props,
      attributes = _objectWithoutProperties(_this$props, _excluded);
    if (grid) {
      colSizes.forEach(colSize => {
        if (grid[colSize]) {
          row = true;
          const sizeNum = parseInt(grid[colSize], 10);
          col[colSize] = sizeNum;
          labelCol[colSize] = 12 - sizeNum;
        }
      });
    }
    const input = /*#__PURE__*/_jsx(AvInput, _objectSpread(_objectSpread({
      id: id,
      className: inputClass,
      size: size,
      disabled: disabled,
      readOnly: readOnly
    }, attributes), {}, {
      children: children
    }));
    const validation = this.context.FormCtrl.getInputState(this.props.name);
    const feedback = validation.errorMessage ? /*#__PURE__*/_jsx(AvFeedback, {
      children: validation.errorMessage
    }) : null;
    const help = helpMessage ? /*#__PURE__*/_jsx(FormText, {
      children: helpMessage
    }) : null;
    const inputRow = row ? /*#__PURE__*/_jsxs(Col, _objectSpread(_objectSpread({}, col), {}, {
      children: [input, feedback, help]
    })) : input;
    const check = attributes.type === 'checkbox';
    return /*#__PURE__*/_jsxs(AvGroup, _objectSpread(_objectSpread({
      check: check,
      disabled: disabled,
      row: row
    }, groupAttrs), {}, {
      children: [check && inputRow, label && /*#__PURE__*/_jsx(Label, _objectSpread(_objectSpread(_objectSpread({
        for: id,
        className: labelClass,
        hidden: labelHidden,
        size: size
      }, labelCol), labelAttrs), {}, {
        children: label
      })), !check && inputRow, !row && feedback, !row && help]
    }));
  }
}
_defineProperty(AvField, "propTypes", Object.assign({}, AvInput.propTypes, {
  label: PropTypes.node,
  labelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  helpMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelAttrs: PropTypes.object,
  groupAttrs: PropTypes.object,
  grid: PropTypes.object
}));
_defineProperty(AvField, "contextTypes", {
  FormCtrl: PropTypes.object.isRequired
});
_defineProperty(AvField, "childContextTypes", {
  FormCtrl: PropTypes.object.isRequired
});