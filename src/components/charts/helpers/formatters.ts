import { ellipsisString, formatNumber } from '../../../utils/helpers';

/**
 * @param {string | number} value
 * @param {number} [maxStringLength]
 * @returns {string}
 */
function formatLabel(value, maxStringLength = 9) {
  if (value == null) return undefined;

  if (typeof value === 'string') return ellipsisString({ str: value, maxStringLength });

  return formatNumber({ num: value });
}

/**
 * @description
 * The argument `date` is a unix timestamp in milliseconds, which means it's a number.
 * I didn't put number as the type, because of FORMATTERS. When calling FORMATTERS[type](value),
 * there's a mixture of types, and hence a typescript error.
 * @param {any} date
 * @returns {string}
 */
function formatDate(date) {
  const formattedDate = Intl.DateTimeFormat('en-US').format(date);

  return formattedDate;
}

const FORMATTERS = {
  category: formatLabel,
  number: formatLabel,
  datetime: formatDate,
};

export { FORMATTERS, formatDate, formatLabel };
