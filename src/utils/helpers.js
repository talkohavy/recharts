const map = [
  { suffix: 'T', threshold: 1e12 },
  { suffix: 'B', threshold: 1e9 },
  { suffix: 'M', threshold: 1e6 },
  { suffix: 'K', threshold: 1e3 },
  { suffix: '', threshold: 1 },
];

/**
 * @param {{num: number; precision?: number}} props
 * @returns {string}
 */
function formatNumber({ num, precision = 2 }) {
  const found = map.find((mapItem) => Math.abs(num) >= mapItem.threshold);
  if (found) {
    const precisionValue = 10 ** precision;
    const formatted = Math.round((num / found.threshold) * precisionValue) / precisionValue + found.suffix;

    return formatted;
  }

  return num.toString();
}

/**
 * @param {string} str
 * @returns {string}
 */
function ellipsisString(str) {
  return str.length > 8 ? str.substring(0, 8).concat('..') : str;
}

export { ellipsisString, formatNumber };
