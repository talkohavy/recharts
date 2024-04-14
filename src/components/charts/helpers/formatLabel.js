import { ellipsisString, formatNumber } from '../../../utils/helpers';

/**
 * @param {string | number} value
 * @param {number} [maxStringLength]
 * @returns {string}
 */
function formatLabel(value, maxStringLength = 8) {
  if (value == null) return undefined;

  if (typeof value === 'string') return ellipsisString({ str: value, maxStringLength });

  return formatNumber({ num: value });
}

export { formatLabel };
