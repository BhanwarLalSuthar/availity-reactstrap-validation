import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
const _excluded = ["tag", "errorMessage", "model", "onValidSubmit", "onInvalidSubmit", "validate", "validateOne", "validateAll", "validationEvent", "disabled", "readOnly", "beforeSubmitValidation", "className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import PropTypes from 'prop-types';
import InputContainer from './AvInputContainer';
import AvValidator from './AvValidator';
import { Form } from 'reactstrap';
import classNames from 'classnames';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _throttle from 'lodash/throttle';
import isString from 'lodash/isString';
import { jsx as _jsx } from "react/jsx-runtime";
const getInputErrorMessage = (input, ruleName) => {
  const errorMessage = input && input.props && input.props.errorMessage;
  if (typeof errorMessage === 'object') {
    return errorMessage[ruleName];
  }
  return errorMessage;
};
export default class AvForm extends InputContainer {
  constructor() {
    super(...arguments);
    _defineProperty(this, "_isMounted", false);
    _defineProperty(this, "state", {
      invalidInputs: {},
      dirtyInputs: {},
      touchedInputs: {},
      badInputs: {},
      submitted: false
    });
    _defineProperty(this, "validations", {});
    _defineProperty(this, "handleSubmit", async e => {
      if (this.props.beforeSubmitValidation) {
        this.props.beforeSubmitValidation(e);
      }
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      if (this.props.disabled) {
        return;
      }
      const values = this.getValues();
      const {
        isValid,
        errors
      } = await this.validateAll(values, false);
      this.setTouched(Object.keys(this._inputs), true, false);
      this.updateInputs();
      this.props.onSubmit(e, errors, values);
      if (isValid) {
        this.props.onValidSubmit(e, values);
      } else {
        this.props.onInvalidSubmit(e, errors, values);
      }
      !this.state.submitted && this._isMounted && this.setState({
        submitted: true
      });
    });
    _defineProperty(this, "handleNonFormSubmission", event => {
      if (this.props.onKeyDown(event) !== false) {
        if (event.type === 'keydown' && (event.which === 13 || event.keyCode === 13 || event.key === 'Enter')) {
          event.stopPropagation();
          event.preventDefault();
          this.handleSubmit(event);
        }
      }
    });
  }
  getChildContext() {
    return {
      FormCtrl: {
        getDefaultValue: this.getDefaultValue.bind(this),
        getInputState: this.getInputState.bind(this),
        getInput: name => this._inputs[name],
        getInputValue: this.getValue.bind(this),
        getInputs: this.getInputs.bind(this),
        getValues: this.getValues.bind(this),
        hasError: this.hasError.bind(this),
        isDirty: this.isDirty.bind(this),
        isTouched: this.isTouched.bind(this),
        isBad: this.isBad.bind(this),
        isDisabled: () => this.props.disabled,
        isReadOnly: () => this.props.readOnly,
        setDirty: this.setDirty.bind(this),
        setTouched: this.setTouched.bind(this),
        setBad: this.setBad.bind(this),
        register: this.registerInput.bind(this),
        unregister: this.unregisterInput.bind(this),
        validate: this.validateInput.bind(this),
        getValidationEvent: () => this.props.validationEvent,
        parent: this.context.FormCtrl || null
      }
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this._validators = {};
  }
  registerInput(input, updater) {
    super.registerInput(input, updater);
    if (typeof input.validations === 'object') {
      this._validators[input.props.name] = this.compileValidationRules(input, input.validations);
    }
  }
  unregisterInput(input) {
    super.unregisterInput(input);
    delete this._validators[input.props.name];
    this.setError(input.props.name, false);
    this.setDirty(input.props.name, false);
    this.setTouched(input.props.name, false);
    this.setBad(input.props.name, false);
  }
  render() {
    const _this$props = this.props,
      {
        tag: Tag,
        errorMessage: omit1,
        model: omit2,
        onValidSubmit: omit3,
        onInvalidSubmit: omit4,
        validate: omit5,
        validateOne: omit6,
        validateAll: omit7,
        validationEvent: omit8,
        disabled: omit9,
        readOnly: omit10,
        beforeSubmitValidation: omit11,
        className
      } = _this$props,
      attributes = _objectWithoutProperties(_this$props, _excluded);
    const classes = classNames(className, this.state.submitted ? 'av-submitted' : false, Object.keys(this.state.invalidInputs).length > 0 ? 'av-invalid' : 'av-valid');
    if (Tag !== 'form' && Tag !== Form) {
      attributes.onKeyDown = this.handleNonFormSubmission;
    }
    return /*#__PURE__*/_jsx(Tag, _objectSpread(_objectSpread({
      noValidate: true,
      action: "#"
    }, attributes), {}, {
      className: classes,
      onSubmit: this.handleSubmit
    }));
  }
  getInputs() {
    return this._inputs;
  }
  getValues() {
    return Object.keys(this._inputs).reduce((values, inputName) => {
      _set(values, inputName, this.getValue(inputName));
      return values;
    }, {});
  }
  submit() {
    this.handleSubmit(...arguments);
  }
  reset() {
    Object.keys(this._inputs).forEach(inputName => this._inputs[inputName] && this._inputs[inputName].reset());
  }
  updateInputs() {
    if (this.throttledUpdateInputs) {
      this.throttledUpdateInputs();
      return;
    }
    // this is just until a more intelligent way to determine which inputs need updated is implemented in v3
    this.throttledUpdateInputs = _throttle(() => {
      Object.keys(this._updaters).forEach(inputName => this._updaters[inputName] && this._inputs[inputName] && this._updaters[inputName].call(this._inputs[inputName], {}));
    }, 250);
    this.updateInputs();
  }
  async validateInput(name) {
    await this.validateOne(name, this.getValues());
  }
  getInputState(inputName) {
    let errorMessage;
    const error = this.isTouched(inputName) && this.hasError(inputName);
    let color;
    if (error) {
      errorMessage = this.state.invalidInputs[inputName];
      color = 'danger';
      if (!isString(errorMessage)) {
        errorMessage = 'This field is invalid';
      }
    }
    return {
      color,
      error,
      errorMessage
    };
  }
  hasError(inputName) {
    return inputName ? !!this.state.invalidInputs[inputName] : Object.keys(this.state.invalidInputs).length > 0;
  }
  isDirty(inputName) {
    return inputName ? !!this.state.dirtyInputs[inputName] : Object.keys(this.state.dirtyInputs).length > 0;
  }
  isTouched(inputName) {
    return inputName ? !!this.state.touchedInputs[inputName] : Object.keys(this.state.touchedInputs).length > 0;
  }
  isBad(inputName) {
    return inputName ? !!this.state.badInputs[inputName] : Object.keys(this.state.badInputs).length > 0;
  }
  setError(inputName) {
    let error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let errText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : error;
    let update = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (error && !isString(errText) && typeof errText !== 'boolean') {
      errText = errText + '';
    }
    let changed = false;
    const currentError = this.hasError(inputName);
    let invalidInputs = this.state.invalidInputs;
    if ((invalidInputs[inputName] === undefined && !error || invalidInputs[inputName] === (errText || true)) && error === currentError) return;
    if (error) {
      invalidInputs[inputName] = errText || true;
      changed = true;
    } else {
      delete invalidInputs[inputName];
      changed = true;
    }
    if (!changed) return;
    invalidInputs = _objectSpread({}, this.state.invalidInputs);
    this._isMounted && this.setState({
      invalidInputs
    }, () => {
      if (update) this.updateInputs();
    });
  }
  setDirty(inputs) {
    let dirty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let dirtyInputs = this.state.dirtyInputs;
    let changed = false;
    if (!Array.isArray(inputs)) {
      inputs = [inputs];
    }
    inputs.forEach(inputName => {
      if (dirty && !dirtyInputs[inputName]) {
        dirtyInputs[inputName] = true;
        changed = true;
      } else if (!dirty && dirtyInputs[inputName]) {
        delete dirtyInputs[inputName];
        changed = true;
      }
    });
    if (!changed) return;
    dirtyInputs = _objectSpread({}, this.state.dirtyInputs);
    this._isMounted && this.setState({
      dirtyInputs
    }, () => {
      if (update) this.updateInputs();
    });
  }
  setTouched(inputs) {
    let touched = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let touchedInputs = this.state.touchedInputs;
    let changed = false;
    if (!Array.isArray(inputs)) {
      inputs = [inputs];
    }
    inputs.forEach(inputName => {
      if (touched && !touchedInputs[inputName]) {
        touchedInputs[inputName] = true;
        changed = true;
      } else if (!touched && touchedInputs[inputName]) {
        delete touchedInputs[inputName];
        changed = true;
      }
    });
    if (!changed) return;
    touchedInputs = _objectSpread({}, this.state.touchedInputs);
    this._isMounted && this.setState({
      touchedInputs
    }, () => {
      if (update) this.updateInputs();
    });
  }
  setBad(inputs) {
    let isBad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let badInputs = this.state.badInputs;
    let changed = false;
    if (!Array.isArray(inputs)) {
      inputs = [inputs];
    }
    inputs.forEach(inputName => {
      if (isBad && !badInputs[inputName]) {
        badInputs[inputName] = true;
        changed = true;
      } else if (!isBad && badInputs[inputName]) {
        delete badInputs[inputName];
        changed = true;
      }
    });
    if (!changed) return;
    badInputs = _objectSpread({}, this.state.badInputs);
    this._isMounted && this.setState({
      badInputs
    }, () => {
      if (update) this.updateInputs();
    });
  }
  async validateOne(inputName, context) {
    let update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const input = this._inputs[inputName];
    if (Array.isArray(input)) {
      throw new Error("Multiple inputs cannot use the same name: \"".concat(inputName, "\""));
    }
    const value = _get(context, inputName);
    const validate = input.validations;
    let isValid = true;
    let result;
    let error;
    if (typeof validate === 'function') {
      result = await validate(value, context, input);
    } else if (typeof validate === 'object') {
      result = await this._validators[inputName](value, context);
    } else {
      result = true;
    }
    if (result !== true) {
      isValid = false;
      if (isString(result)) {
        error = result;
      }
    }
    this.setError(inputName, !isValid, error, update);
    return isValid;
  }
  async validateAll(context) {
    let update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const errors = [];
    let isValid = true;
    for (const inputName in this._inputs) {
      /* istanbul ignore else  */
      if (Object.prototype.hasOwnProperty.call(this._inputs, inputName)) {
        const valid = await this.validateOne(inputName, context, update);
        if (!valid) {
          isValid = false;
          errors.push(inputName);
        }
      }
    }
    if (this.props.validate) {
      let formLevelValidation = this.props.validate;
      if (!Array.isArray(formLevelValidation)) {
        formLevelValidation = [formLevelValidation];
      }
      if (!formLevelValidation.every(validationFn => validationFn(context))) {
        isValid = false;
        errors.push('*');
      }
    }
    return {
      isValid,
      errors
    };
  }
  compileValidationRules(input, ruleProp) {
    return async (val, context) => {
      if (this.isBad(input.props.name)) {
        return false;
      }
      let result = true;
      const validations = [];
      for (const rule in ruleProp) {
        /* istanbul ignore else  */
        if (Object.prototype.hasOwnProperty.call(ruleProp, rule)) {
          let ruleResult;
          const promise = new Promise((resolve, reject) => {
            const callback = value => resolve({
              value,
              rule
            });
            if (typeof ruleProp[rule] === 'function') {
              ruleResult = ruleProp[rule](val, context, input, callback);
            } else {
              if (typeof AvValidator[rule] !== 'function') {
                return reject(new Error("Invalid input validation rule: \"".concat(rule, "\"")));
              }
              if (ruleProp[rule].enabled === false) {
                ruleResult = true;
              } else {
                ruleResult = AvValidator[rule](val, context, ruleProp[rule], input, callback);
              }
            }
            if (ruleResult && typeof ruleResult.then === 'function') {
              ruleResult.then(callback);
            } else if (ruleResult !== undefined) {
              callback(ruleResult);
            } else {
              // they are using the callback
            }
          });
          validations.push(promise);
        }
      }
      await Promise.all(validations).then(results => {
        results.every(ruleResult => {
          if (result === true && ruleResult.value !== true) {
            result = isString(ruleResult.value) && ruleResult.value || getInputErrorMessage(input, ruleResult.rule) || getInputErrorMessage(this, ruleResult.rule) || false;
          }
          return result === true;
        });
      });
      return result;
    };
  }
  getDefaultValue(inputName) {
    return _get(this.props.model, inputName);
  }
  getValue(inputName) {
    const input = this._inputs[inputName];
    if (!input) return undefined;
    if (Array.isArray(input)) {
      throw new Error("Multiple inputs cannot use the same name: \"".concat(inputName, "\""));
    }
    return input.getValue();
  }
}
_defineProperty(AvForm, "childContextTypes", {
  FormCtrl: PropTypes.object.isRequired
});
_defineProperty(AvForm, "contextTypes", {
  FormCtrl: PropTypes.object
});
_defineProperty(AvForm, "propTypes", {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  model: PropTypes.object,
  method: PropTypes.oneOf(['get', 'post']),
  onSubmit: PropTypes.func,
  beforeSubmitValidation: PropTypes.func,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  onValidSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
  validationEvent: PropTypes.oneOfType([PropTypes.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus']), PropTypes.arrayOf(PropTypes.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus']))]),
  errorMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
});
_defineProperty(AvForm, "defaultProps", {
  tag: Form,
  model: {},
  validationEvent: ['onChange', 'onInput'],
  method: 'get',
  onSubmit: () => {},
  onKeyDown: () => {},
  onValidSubmit: () => {},
  onInvalidSubmit: () => {}
});