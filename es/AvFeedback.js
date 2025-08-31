import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { Component } from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';
import { jsx as _jsx } from "react/jsx-runtime";
export default class AvFeedback extends Component {
  render() {
    const validation = this.context.Group.getInputState();
    return /*#__PURE__*/_jsx(FormFeedback, _objectSpread({
      valid: !validation.error
    }, this.props));
  }
}
_defineProperty(AvFeedback, "propTypes", Object.assign({}, FormFeedback.propTypes));
_defineProperty(AvFeedback, "contextTypes", {
  FormCtrl: PropTypes.object.isRequired,
  Group: PropTypes.object.isRequired
});