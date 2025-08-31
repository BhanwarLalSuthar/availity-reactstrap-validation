export default class AvRadioGroup extends Component<any, any, any> {
    static propTypes: any;
    static contextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    };
    static childContextTypes: {
        Group: PropTypes.Validator<object>;
        FormCtrl: PropTypes.Validator<object>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        invalidInputs: {};
        dirtyInputs: {};
        touchedInputs: {};
        badInputs: {};
        validate: {};
        value: string;
    };
    getChildContext(): {
        Group: {
            getProps: () => {
                name: any;
                inline: any;
                required: any;
                value: string;
            };
            update: (e: any, value: any) => Promise<void>;
            getValue: () => string;
            getInputState: any;
        };
        FormCtrl: any;
    };
    FormCtrl: any;
    value: string;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    getValue(): string;
    getInputState(): any;
    getDefaultValue(): {
        key: string;
        value: string;
    };
    validate(): Promise<void>;
    update(): void;
    _inputs: any[];
    updateValidations(props?: Readonly<any>): void;
    validations: any;
    updateInputs(): void;
    reset(): void;
    registerInput(input: any): void;
    unregisterInput(input: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { Component } from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=AvRadioGroup.d.ts.map