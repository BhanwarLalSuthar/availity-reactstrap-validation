import { isEmpty } from './utils';
export default function validate(value, context) {
  let {
    value: enabled = true,
    errorMessage = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return !enabled || !isEmpty(value) || errorMessage || false;
}