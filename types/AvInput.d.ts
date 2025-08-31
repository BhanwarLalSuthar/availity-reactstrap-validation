export default class AvInput extends AvBaseInput {
    static defaultProps: {
        validationEvent: string;
        validate: {};
        trueValue: boolean;
        falseValue: boolean;
    } & {
        tag: typeof Input;
    };
    getValue(): any;
    getViewValue(): any;
    render(): import("react/jsx-runtime").JSX.Element;
}
import AvBaseInput from './AvBaseInput';
import { Input } from 'reactstrap';
//# sourceMappingURL=AvInput.d.ts.map