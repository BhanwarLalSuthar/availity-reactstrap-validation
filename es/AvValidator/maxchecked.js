import toNumber from 'lodash/toNumber';
import { isEmpty, isDecimal } from './utils';
export default function validate(value, context) {
  let constraint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let input = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (isEmpty(input.value)) return true;
  const max = toNumber(constraint.value);
  return !isNaN(max) && isFinite(max) && !isDecimal(max) && max >= input.value.length || constraint.errorMessage || false;
}