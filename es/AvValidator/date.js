import moment from 'moment';
import { isEmpty, isoDateFormat } from './utils';
export default function validate(value, context) {
  let {
    format = 'MM/DD/YYYY',
    errorMessage = "Format needs to be ".concat(format)
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (isEmpty(value)) return true;
  const date = moment(value, [isoDateFormat, format], true);
  return date.isValid() || errorMessage;
}