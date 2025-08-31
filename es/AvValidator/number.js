import isNumber from 'lodash/isNumber';
import toNumber from 'lodash/toNumber';
import { isEmpty } from './utils';
export default function validate(value, context) {
  let {
    errorMessage = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (isEmpty(value)) return true;
  const number = toNumber(value);
  return isNumber(number) && !isNaN(number) || errorMessage;
}