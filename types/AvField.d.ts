export default class AvField extends Component<any, any, any> {
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
    } & {
        label: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        labelHidden: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
        id: PropTypes.Requireable<string>;
        inputClass: PropTypes.Requireable<string>;
        labelClass: PropTypes.Requireable<string>;
        helpMessage: PropTypes.Requireable<NonNullable<string | object>>;
        errorMessage: PropTypes.Requireable<NonNullable<string | object>>;
        labelAttrs: PropTypes.Requireable<object>;
        groupAttrs: PropTypes.Requireable<object>;
        grid: PropTypes.Requireable<object>;
    };
    static contextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    };
    static childContextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    getChildContext(): {
        FormCtrl: any;
    };
    FormCtrl: any;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { Component } from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=AvField.d.ts.map