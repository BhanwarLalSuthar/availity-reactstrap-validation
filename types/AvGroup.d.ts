export default class AvGroup extends Component<any, any, any> {
    static propTypes: any;
    static contextTypes: {
        FormCtrl: PropTypes.Validator<object>;
    };
    static childContextTypes: {
        Group: PropTypes.Validator<object>;
        FormCtrl: PropTypes.Validator<object>;
    };
    constructor(props: any);
    state: {
        input: {
            props: {};
        };
    };
    getChildContext(): {
        Group: {
            getInput: () => {
                props: {};
            };
            getInputState: any;
        };
        FormCtrl: any;
    };
    FormCtrl: any;
    getInputState(): any;
    update(input: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
import { Component } from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=AvGroup.d.ts.map