export default class AvBaseInput extends Component<any, any, any> {
    static propTypes: {
        name: PropTypes.Validator<string>;
        validationEvent: PropTypes.Requireable<NonNullable<string | string[]>>;
        validate: PropTypes.Requireable<object>;
        value: PropTypes.Requireable<any>;
        defaultValue: PropTypes.Requireable<any>;
        trueValue: PropTypes.Requireable<any>;
        falseValue: PropTypes.Requireable<any>;
        checked: PropTypes.Requireable<boolean>;
        defaultChecked: PropTypes.Requireable<boolean>;
        state: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        multiple: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        onKeyUp: PropTypes.Requireable<(...args: any[]) => any>;
        onInput: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onReset: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static contextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    };
    static defaultProps: {
        validationEvent: string;
        validate: {};
        trueValue: boolean;
        falseValue: boolean;
    };
    constructor(props: any);
    state: {
        value: string | any[];
    };
    validations: {};
    value: string;
    onKeyUpHandler(event: any): void;
    onInputHandler(_value: any): void;
    onBlurHandler(_value: any): void;
    onFocusHandler(_value: any): void;
    onChangeHandler(_value: any): void;
    validate(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    getDefaultValue(): any;
    getFieldValue(event: any): any;
    getValidationEvent(): any[];
    getValidatorProps(): {
        onKeyUp: (event: any) => void;
        onBlur: (_value: any) => void;
        onInput: (_value: any) => void;
        onFocus: (_value: any) => void;
        onChange: (_value: any) => void;
        value: string;
    };
    getValue(): string;
    reset(): void;
    validateEvent(eventName: any, _event: any): void;
    updateValidations(props?: Readonly<any>): void;
}
import { Component } from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=AvBaseInput.d.ts.map