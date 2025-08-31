import { ComponentType, ReactElement, ReactNode } from 'react';

// Base input props interface
export interface AvBaseInputProps {
  name: string;
  value?: any;
  validate?: Record<string, any>;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onFocus?: (value: any) => void;
  onInput?: (value: any) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Form props interface
export interface AvFormProps {
  model?: Record<string, any>;
  onValidSubmit?: (event: Event, values: Record<string, any>) => void;
  onInvalidSubmit?: (event: Event, errors: Record<string, any>, values: Record<string, any>) => void;
  onSubmit?: (event: Event, errors: Record<string, any>, values: Record<string, any>) => void;
  validationEvent?: string;
  disabled?: boolean;
  readOnly?: boolean;
  beforeSubmitValidation?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  tag?: string | ComponentType<any>;
}

// Field props interface
export interface AvFieldProps extends AvBaseInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  helpMessage?: string;
  errorMessage?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  step?: number | string;
  multiple?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  trueValue?: any;
  falseValue?: any;
  options?: Array<{ value: any; label: string; disabled?: boolean }>;
}

// Checkbox props interface
export interface AvCheckboxProps extends AvBaseInputProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  trueValue?: any;
  falseValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
}

// Checkbox group props interface
export interface AvCheckboxGroupProps extends AvBaseInputProps {
  label?: string;
  options?: Array<{ value: any; label: string; disabled?: boolean }>;
  inline?: boolean;
}

// Radio props interface
export interface AvRadioProps extends AvBaseInputProps {
  label?: string;
  value: any;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

// Radio group props interface
export interface AvRadioGroupProps extends AvBaseInputProps {
  label?: string;
  options?: Array<{ value: any; label: string; disabled?: boolean }>;
  inline?: boolean;
}

// Feedback props interface
export interface AvFeedbackProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Group props interface
export interface AvGroupProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Input container props interface
export interface AvInputContainerProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Component exports
export declare const AvForm: ComponentType<AvFormProps>;
export declare const AvField: ComponentType<AvFieldProps>;
export declare const AvCheckbox: ComponentType<AvCheckboxProps>;
export declare const AvCheckboxGroup: ComponentType<AvCheckboxGroupProps>;
export declare const AvRadio: ComponentType<AvRadioProps>;
export declare const AvRadioGroup: ComponentType<AvRadioGroupProps>;
export declare const AvFeedback: ComponentType<AvFeedbackProps>;
export declare const AvGroup: ComponentType<AvGroupProps>;
export declare const AvInputContainer: ComponentType<AvInputContainerProps>;

// Validator exports
export declare const AvValidator: {
  required: (value: any) => boolean;
  email: (value: any) => boolean;
  url: (value: any) => boolean;
  number: (value: any) => boolean;
  min: (value: any, min: number) => boolean;
  max: (value: any, max: number) => boolean;
  minLength: (value: any, minLength: number) => boolean;
  maxLength: (value: any, maxLength: number) => boolean;
  pattern: (value: any, pattern: string | RegExp) => boolean;
  match: (value: any, matchValue: any) => boolean;
  date: (value: any) => boolean;
  dateRange: (value: any, minDate: Date, maxDate: Date) => boolean;
  phone: (value: any) => boolean;
  npi: (value: any) => boolean;
  step: (value: any, step: number) => boolean;
  minchecked: (value: any[], min: number) => boolean;
  maxchecked: (value: any[], max: number) => boolean;
};

// Default export
declare const _default: {
  AvForm: ComponentType<AvFormProps>;
  AvField: ComponentType<AvFieldProps>;
  AvCheckbox: ComponentType<AvCheckboxProps>;
  AvCheckboxGroup: ComponentType<AvCheckboxGroupProps>;
  AvRadio: ComponentType<AvRadioProps>;
  AvRadioGroup: ComponentType<AvRadioGroupProps>;
  AvFeedback: ComponentType<AvFeedbackProps>;
  AvGroup: ComponentType<AvGroupProps>;
  AvInputContainer: ComponentType<AvInputContainerProps>;
  AvValidator: typeof AvValidator;
};

export default _default;
