import { isEmpty } from './utils';
import get from 'lodash/get';
export default function validate(value, context) {
  let constraint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return isEmpty(value) || value === get(context, constraint.value) || constraint.errorMessage || false;
}