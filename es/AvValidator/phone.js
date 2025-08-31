import patternValidation from './pattern';

// eslint-disable-next-line no-useless-escape
const NANP_REGEXP = /^(\+?1[\.\-\s]?)?\(?[2-9]\d{2}[\)\.\-\s]?\s?[2-9]\d{2}[\.\-\s]?\d{4}$/;
export default function validate(value, context) {
  let {
    pattern = NANP_REGEXP,
    errorMessage = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return patternValidation(value, context, {
    value: pattern,
    errorMessage
  });
}