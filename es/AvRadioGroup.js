import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
const _excluded = ["errorMessage", "validate", "validationEvent", "state", "label", "required", "inline", "children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import { FormGroup } from 'reactstrap';
import classNames from 'classnames';
import AvFeedback from './AvFeedback';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const htmlValidationAttrs = ['required'];
const noop = () => {};
export default class AvRadioGroup extends Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      invalidInputs: {},
      dirtyInputs: {},
      touchedInputs: {},
      badInputs: {},
      validate: {},
      value: ''
    });
    _defineProperty(this, "_inputs", []);
    _defineProperty(this, "value", '');
  }
  getChildContext() {
    if (!this.FormCtrl) {
      this.FormCtrl = _objectSpread({}, this.context.FormCtrl);
      this.FormCtrl.register = this.registerInput.bind(this);
      this.FormCtrl.unregister = this.unregisterInput.bind(this);
      this.FormCtrl.validate = noop;
    }
    const updateGroup = async (e, value) => {
      this.setState({
        value
      });
      this.value = value;
      await this.validate();
      !this.context.FormCtrl.isTouched(this.props.name) && this.context.FormCtrl.setTouched(this.props.name);
      !this.context.FormCtrl.isDirty(this.props.name) && this.context.FormCtrl.setDirty(this.props.name);
      this.props.onChange && this.props.onChange(e, value);
    };
    return {
      Group: {
        getProps: () => ({
          name: this.props.name,
          inline: this.props.inline,
          required: this.props.required || !!(this.validations.required && this.validations.required.value),
          value: this.value
        }),
        update: updateGroup,
        getValue: () => this.value,
        getInputState: this.getInputState.bind(this)
      },
      FormCtrl: this.FormCtrl
    };
  }
  componentDidMount() {
    this.value = this.props.value || this.getDefaultValue().value;
    this.setState({
      value: this.value
    });
    this.updateValidations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.context.FormCtrl.unregister(this);
      this.context.FormCtrl.register(this, this.update.bind(this));
    }
    if (prevProps.value !== this.props.value) {
      this.value = this.props.value;
      this.setState({
        value: this.props.value
      });
    }
    if (!isEqual(this.props, prevProps)) {
      this.updateValidations(this.props);
    }
  }
  componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  }
  getValue() {
    return this.value;
  }
  getInputState() {
    return this.context.FormCtrl.getInputState(this.props.name);
  }
  getDefaultValue() {
    const key = 'defaultValue';
    let value = '';
    if (!isUndefined(this.props[key])) {
      value = this.props[key];
    } else if (!isUndefined(this.context.FormCtrl.getDefaultValue(this.props.name))) {
      value = this.context.FormCtrl.getDefaultValue(this.props.name);
    }
    return {
      key,
      value
    };
  }
  async validate() {
    await this.context.FormCtrl.validate(this.props.name);
    this.updateInputs();
  }
  update() {
    this.setState({});
    this.updateInputs();
  }
  updateValidations() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    this.validations = Object.assign({}, props.validate);
    Object.keys(props).filter(val => htmlValidationAttrs.indexOf(val) > -1).forEach(attr => {
      if (props[attr]) {
        this.validations[attr] = this.validations[attr] || {
          value: props[attr]
        };
      } else {
        delete this.validations[attr];
      }
    });
    this.context.FormCtrl.register(this, this.update.bind(this));
    this.validate();
  }
  updateInputs() {
    this._inputs.forEach(input => input.setState.call(input, {}));
    this.setState({});
  }
  reset() {
    this.value = this.getDefaultValue().value;
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({
      value: this.value
    });
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  }
  registerInput(input) {
    if (this._inputs.indexOf(input) < 0) {
      this._inputs.push(input);
    }
  }
  unregisterInput(input) {
    this._inputs = this._inputs.filter(ipt => {
      return ipt !== input;
    });
  }
  render() {
    const legend = this.props.label ? /*#__PURE__*/_jsx("legend", {
      children: this.props.label
    }) : '';
    const validation = this.getInputState();
    const _this$props = this.props,
      {
        errorMessage: omit1,
        validate: omit2,
        validationEvent: omit3,
        state: omit4,
        label: omit5,
        required: omit6,
        inline: omit7,
        children
      } = _this$props,
      attributes = _objectWithoutProperties(_this$props, _excluded);
    const touched = this.context.FormCtrl.isTouched(this.props.name);
    const hasError = this.context.FormCtrl.hasError(this.props.name);
    const classes = classNames('form-control border-0 p-0 h-auto', touched ? 'is-touched' : 'is-untouched', this.context.FormCtrl.isDirty(this.props.name) ? 'is-dirty' : 'is-pristine', this.context.FormCtrl.isBad(this.props.name) ? 'is-bad-input' : null, hasError ? 'av-invalid' : 'av-valid', touched && hasError && 'is-invalid');
    const groupClass = classNames(attributes.className, touched && hasError && 'was-validated');
    return /*#__PURE__*/_jsxs(FormGroup, _objectSpread(_objectSpread({
      tag: "fieldset"
    }, attributes), {}, {
      className: groupClass,
      children: [legend, /*#__PURE__*/_jsx("div", {
        className: classes,
        children: children
      }), /*#__PURE__*/_jsx(AvFeedback, {
        children: validation.errorMessage
      })]
    }));
  }
}
_defineProperty(AvRadioGroup, "propTypes", Object.assign({}, FormGroup.propTypes, {
  name: PropTypes.string.isRequired
}));
_defineProperty(AvRadioGroup, "contextTypes", {
  FormCtrl: PropTypes.object.isRequired
});
_defineProperty(AvRadioGroup, "childContextTypes", {
  Group: PropTypes.object.isRequired,
  FormCtrl: PropTypes.object.isRequired
});