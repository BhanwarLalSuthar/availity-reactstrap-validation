import toNumber from 'lodash/toNumber';
import { isEmpty } from './utils';
export default function validate(value, context) {
  let constraint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (isEmpty(value)) return true;
  const length = value.length;
  return length >= toNumber(constraint.value) || constraint.errorMessage || false;
}