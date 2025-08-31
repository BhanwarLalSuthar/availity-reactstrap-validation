import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import { Component } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
const htmlValidationAttrs = ['min', 'max', 'minLength', 'maxLength', 'pattern', 'required', 'step'];
const htmlValidationTypes = ['email', 'date', 'datetime', 'number', 'tel', 'url'
/* 'range', 'month', 'week', 'time'*/ // These do not currently have validation
];
export default class AvBaseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.multiple ? [] : ''
    };
    this.validations = {};
    this.value = '';
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.value = this.props.value || this.getDefaultValue();
    this.setState({
      value: this.value
    });
    this.updateValidations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.context.FormCtrl.unregister(this);
      this.context.FormCtrl.register(this);
    }
    if (prevProps.type === 'checkbox') {
      if (this.props.checked !== prevProps.checked) {
        if (this.props.checked) {
          this.value = this.props.trueValue;
        } else {
          this.value = this.props.falseValue;
        }
        this.setState({
          value: this.value
        });
      }
    } else {
      if (this.props.multiple !== prevProps.multiple) {
        this.value = this.props.multiple ? [] : '';
        this.setState({
          value: this.value
        });
      }
      if (this.props.value !== prevProps.value) {
        this.value = this.props.value;
        this.setState({
          value: this.props.value
        });
      }
    }
    if (!isEqual(this.props, prevProps)) {
      this.updateValidations(this.props);
    }
  }
  componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  }
  onKeyUpHandler(event) {
    const badInput = get(event, 'target.validity.badInput', false);
    if (badInput !== this.context.FormCtrl.isBad(this.props.name)) {
      this.context.FormCtrl.setBad(this.props.name, badInput);
      this.validate();
    }
    this.props.onKeyUp && this.props.onKeyUp(event);
  }
  onInputHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onInput', _value);
    !this.context.FormCtrl.isDirty(this.props.name) && this.context.FormCtrl.setDirty(this.props.name);
  }
  onBlurHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onBlur', _value);
    !this.context.FormCtrl.isTouched(this.props.name) && this.context.FormCtrl.setTouched(this.props.name);
  }
  onFocusHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onFocus', _value);
  }
  onChangeHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onChange', _value);
    !this.context.FormCtrl.isDirty(this.props.name) && this.context.FormCtrl.setDirty(this.props.name);
  }
  getDefaultValue() {
    let defaultValue = '';
    if (this.props.type === 'checkbox' || this.props.type === 'switch') {
      if (!isUndefined(this.props.defaultChecked)) {
        return this.props.defaultChecked ? this.props.trueValue : this.props.falseValue;
      }
      defaultValue = this.props.falseValue;
    }
    if (this.props.type === 'select' && this.props.multiple) {
      defaultValue = [];
    }
    let value = this.props.defaultValue || this.context.FormCtrl.getDefaultValue(this.props.name);
    if (this.props.type === 'checkbox' && value !== this.props.trueValue) {
      value = defaultValue;
    }
    return isUndefined(value) ? defaultValue : value;
  }
  getFieldValue(event) {
    if (this.props.type === 'checkbox') {
      return event.target.checked ? this.props.trueValue : this.props.falseValue;
    }
    if (this.props.type === 'select' && this.props.multiple) {
      /* // Something about this does not work when transpiled
      return [...event.target.options]
        .filter(({ selected }) => selected)
        .map(({ value }) => value); */
      const ret = [];
      const options = event.target.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          ret.push(options[i].value);
        }
      }
      return ret;
    }
    return event && event.target && !isUndefined(event.target.value) ? event.target.value : event;
  }
  getValidationEvent() {
    const validationEvent = this.props.validationEvent ? this.props.validationEvent : this.context.FormCtrl.getValidationEvent();
    return Array.isArray(validationEvent) ? validationEvent : [validationEvent];
  }
  getValidatorProps() {
    const validatity = this.context.FormCtrl.getInputState(this.props.name);
    const htmlValAttrs = Object.keys(this.props.validate || {}).filter(val => htmlValidationAttrs.indexOf(val) > -1).reduce((result, item) => {
      result[item] = this.props.validate[item].value || this.props.validate[item];
      return result;
    }, {});
    const newProps = _objectSpread({
      onKeyUp: this.onKeyUpHandler,
      onBlur: this.onBlurHandler,
      onInput: this.onInputHandler,
      onFocus: this.onFocusHandler,
      onChange: this.onChangeHandler,
      value: this.value
    }, htmlValAttrs);
    if (this.props.disabled === undefined && this.context.FormCtrl.isDisabled() !== undefined) {
      newProps.disabled = this.context.FormCtrl.isDisabled();
    }
    if (this.props.readOnly === undefined && this.context.FormCtrl.isReadOnly() !== undefined) {
      newProps.readOnly = this.context.FormCtrl.isReadOnly();
    }
    if (this.props.type === 'checkbox') {
      newProps.checked = this.value === this.props.trueValue;
    }
    if (this.props.state || validatity && validatity.errorMessage) {
      newProps.valid = !(validatity && validatity.errorMessage);
    }
    return newProps;
  }
  getValue() {
    return this.value;
  }
  reset() {
    this.value = this.getDefaultValue();
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({
      value: this.value
    });
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  }
  validateEvent(eventName, _event) {
    this.setState({
      value: this.value
    });
    if (this.getValidationEvent().indexOf(eventName) > -1) {
      this.validate();
    }
    this.props[eventName] && this.props[eventName](_event, this.value);
  }
  validate() {
    this.context.FormCtrl.validate(this.props.name);
  }
  updateValidations() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    this.validations = Object.assign({}, props.validate);
    if (htmlValidationTypes.indexOf(props.type) > -1) {
      this.validations[props.type] = this.validations[props.type] || true;
    }
    Object.keys(props).filter(val => htmlValidationAttrs.indexOf(val) > -1).forEach(attr => {
      if (props[attr]) {
        this.validations[attr] = this.validations[attr] || {
          value: props[attr]
        };
      } else {
        delete this.validations[attr];
      }
    });
    this.context.FormCtrl && this.context.FormCtrl.register(this);
    this.validate();
  }
}
_defineProperty(AvBaseInput, "propTypes", {
  name: PropTypes.string.isRequired,
  validationEvent: PropTypes.oneOfType([PropTypes.oneOf(['', 'onInput', 'onChange', 'onBlur', 'onFocus']), PropTypes.arrayOf(PropTypes.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus']))]),
  validate: PropTypes.object,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  trueValue: PropTypes.any,
  falseValue: PropTypes.any,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  state: PropTypes.bool,
  type: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onKeyUp: PropTypes.func,
  onInput: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onReset: PropTypes.func
});
_defineProperty(AvBaseInput, "contextTypes", {
  FormCtrl: PropTypes.object.isRequired
});
_defineProperty(AvBaseInput, "defaultProps", {
  validationEvent: '',
  validate: {},
  trueValue: true,
  falseValue: false
});