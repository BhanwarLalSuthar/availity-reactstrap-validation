import patternValidation from './pattern';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
export default function validate(value, context) {
  let {
    pattern = EMAIL_REGEXP,
    errorMessage = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return patternValidation(value, context, {
    value: pattern,
    errorMessage
  });
}