import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { jsx as _jsx } from "react/jsx-runtime";
export default class AvGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        props: {}
      }
    };
  }
  getChildContext() {
    this.FormCtrl = _objectSpread({}, this.context.FormCtrl);
    const registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = input => {
      this.setState({
        input
      });
      registerValidator(input, this.update.bind(this, input));
    };
    return {
      Group: {
        getInput: () => this.state.input,
        getInputState: this.getInputState.bind(this)
      },
      FormCtrl: this.FormCtrl
    };
  }
  getInputState() {
    return this.context.FormCtrl.getInputState(this.state.input.props.name);
  }
  update(input) {
    if (input && input.setState) input.setState.call(input, {});
    this.setState({});
  }
  render() {
    const validation = this.getInputState();
    const classname = classNames(this.props.className, validation.color && "text-".concat(validation.color));
    return /*#__PURE__*/_jsx(FormGroup, _objectSpread({
      className: classname
    }, this.props));
  }
}
_defineProperty(AvGroup, "propTypes", Object.assign({}, FormGroup.propTypes));
_defineProperty(AvGroup, "contextTypes", {
  FormCtrl: PropTypes.object.isRequired
});
_defineProperty(AvGroup, "childContextTypes", {
  Group: PropTypes.object.isRequired,
  FormCtrl: PropTypes.object.isRequired
});