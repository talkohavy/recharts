/**
 * @typedef {import('../types').BarSeries} BarSeries
 * @typedef {import('../types').LineSeries} LineSeries
 */

/**
 * @param {Array<BarSeries | LineSeries>} chartData
 * @throws An Error.
 */
function validateUniqueNamesOnDataSets(chartData) {
  for (let i = 0; i < chartData.length - 1; i++) {
    for (let j = i + 1; j < chartData.length; j++) {
      if (chartData[i].name === chartData[j].name) throw new Error('Two datasets cannot have the same name!');
    }
  }
}

export { validateUniqueNamesOnDataSets };
