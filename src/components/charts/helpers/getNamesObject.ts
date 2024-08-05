/**
 * @typedef {import('../types').BarSeries} BarSeries
 * @typedef {import('../types').LineSeries} LineSeries
 */

/**
 * @param {Array<BarSeries> | Array<LineSeries>} data
 * @param {any} defaultValue
 */
function getNamesObject(data, defaultValue = null) {
  const obj = {};

  data.forEach(({ name }) => (obj[name] = defaultValue));

  return obj;
}

export { getNamesObject };
