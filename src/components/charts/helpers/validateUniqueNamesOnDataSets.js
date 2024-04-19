/**
 * @typedef {import('../types').SingleBar} SingleBar
 * @typedef {import('../types').SingleLine} SingleLine
 */

/**
 * @param {Array<SingleBar | SingleLine>} chartData
 * @throws An Error.
 */
function validateUniqueNamesOnDataSets(chartData) {
  for (let i = 0; i < chartData.length - 1; i++) {
    for (let j = i + 1; j < chartData.length; j++) {
      if (chartData[i].name === chartData[j].name) throw new Error('Two bars cannot have the same name!');
    }
  }
}

export { validateUniqueNamesOnDataSets };
