import { ellipsisString, formatNumber } from '../../utils/helpers';

/**
 * @param {string | number} value
 * @returns {string}
 */
function formatLabel(value) {
  if (typeof value === 'string') return ellipsisString(value);

  return formatNumber({ num: value });
}

export { formatLabel };
