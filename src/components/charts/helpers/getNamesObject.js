/**
 * @typedef {import('../types').BarSeries} BarSeries
 * @typedef {import('../types').LineSeries} LineSeries
 */

/**
 * @param {Array<BarSeries> | Array<LineSeries>} data
 */
function getNamesObject(data) {
  const obj = {};

  data.forEach(({ name }) => (obj[name] = null));

  return obj;
}

export { getNamesObject };
