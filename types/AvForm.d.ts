export default class AvForm extends InputContainer {
    static childContextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    };
    static contextTypes: {
        FormCtrl: PropTypes.Requireable<object>;
    };
    static propTypes: {
        tag: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any)>>;
        className: PropTypes.Requireable<string>;
        model: PropTypes.Requireable<object>;
        method: PropTypes.Requireable<string>;
        onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        beforeSubmitValidation: PropTypes.Requireable<(...args: any[]) => any>;
        validate: PropTypes.Requireable<NonNullable<any[] | ((...args: any[]) => any)>>;
        onValidSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        onInvalidSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        validationEvent: PropTypes.Requireable<NonNullable<string | string[]>>;
        errorMessage: PropTypes.Requireable<NonNullable<object | PropTypes.ReactNodeLike>>;
        disabled: PropTypes.Requireable<boolean>;
        readOnly: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        tag: typeof Form;
        model: {};
        validationEvent: string[];
        method: string;
        onSubmit: () => void;
        onKeyDown: () => void;
        onValidSubmit: () => void;
        onInvalidSubmit: () => void;
    };
    _isMounted: boolean;
    state: {
        invalidInputs: {};
        dirtyInputs: {};
        touchedInputs: {};
        badInputs: {};
        submitted: boolean;
    };
    validations: {};
    handleSubmit: (e: any) => Promise<void>;
    handleNonFormSubmission: (event: any) => void;
    getChildContext(): {
        FormCtrl: {
            getDefaultValue: any;
            getInputState: any;
            getInput: (name: any) => any;
            getInputValue: any;
            getInputs: any;
            getValues: any;
            hasError: any;
            isDirty: any;
            isTouched: any;
            isBad: any;
            isDisabled: () => any;
            isReadOnly: () => any;
            setDirty: any;
            setTouched: any;
            setBad: any;
            register: any;
            unregister: any;
            validate: any;
            getValidationEvent: () => any;
            parent: any;
        };
    };
    componentWillUnmount(): void;
    componentDidMount(): void;
    _validators: {};
    render(): import("react/jsx-runtime").JSX.Element;
    getInputs(): {};
    getValues(): {};
    submit(...args: any[]): void;
    reset(): void;
    updateInputs(): void;
    throttledUpdateInputs: any;
    validateInput(name: any): Promise<void>;
    getInputState(inputName: any): {
        color: string;
        error: boolean;
        errorMessage: any;
    };
    hasError(inputName: any): boolean;
    isDirty(inputName: any): boolean;
    isTouched(inputName: any): boolean;
    isBad(inputName: any): boolean;
    setError(inputName: any, error?: boolean, errText?: boolean, update?: boolean): void;
    setDirty(inputs: any, dirty?: boolean, update?: boolean): void;
    setTouched(inputs: any, touched?: boolean, update?: boolean): void;
    setBad(inputs: any, isBad?: boolean, update?: boolean): void;
    validateOne(inputName: any, context: any, update?: boolean): Promise<boolean>;
    validateAll(context: any, update?: boolean): Promise<{
        isValid: boolean;
        errors: string[];
    }>;
    compileValidationRules(input: any, ruleProp: any): (val: any, context: any) => Promise<boolean>;
    getDefaultValue(inputName: any): any;
    getValue(inputName: any): any;
}
import InputContainer from './AvInputContainer';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
//# sourceMappingURL=AvForm.d.ts.map