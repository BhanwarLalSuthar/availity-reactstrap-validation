export default class AvCheckbox extends Component<any, any, any> {
    static contextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    } & {
        Group: PropTypes.Validator<object>;
    };
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
    constructor(props: any);
    constructor(props: any, context: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onChangeHandler: (event: any, ...args: any[]) => void;
    isDefaultChecked(valueArr: any): any;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { Component } from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=AvCheckbox.d.ts.map