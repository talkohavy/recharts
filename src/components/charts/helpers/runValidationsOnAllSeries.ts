/**
 * @typedef {import('../types').BarSeries} BarSeries
 * @typedef {import('../types').LineSeries} LineSeries
 */

/**
 * @param {Array<BarSeries | LineSeries>} allSeries
 * @throws An Error.
 */
function validateUniqueNamesOnDataSets(allSeries) {
  for (let i = 0; i < allSeries.length - 1; i++) {
    for (let j = i + 1; j < allSeries.length; j++) {
      if (allSeries[i].name === allSeries[j].name)
        throw new Error(`Two series CANNOT have the same name! Saw '${allSeries[i].name}' twice.`);
    }
  }
}

/**
 * @param {Array<BarSeries | LineSeries>} allSeries
 * @throws An Error.
 */
function validateXAxisValuesAreSameType(allSeries) {
  let currentType = null;
  let prevType = null;

  allSeries.forEach((currentSeries) => {
    currentSeries.data.forEach(({ x }) => {
      currentType = typeof x;

      if (prevType !== null && prevType !== currentType)
        throw new Error('All X values on all series MUST be of the same type!');

      prevType = currentType;
    });
  });
}

/**
 * @param {BarSeries | LineSeries} series
 * @throws An Error.
 */
function validateNameExists(series) {
  if (!series.name) throw new Error('All series MUST have a `name` property on them!');
}

/**
 * @param {BarSeries | LineSeries} series
 * @throws An Error.
 */
function validateDataExists(series) {
  if (!series.data)
    throw new Error(`All series MUST have a 'data' property on them! Could not find 'data' on series ${series.name}`);
}

/**
 * @param {Array<BarSeries | LineSeries>} allSeries
 * @throws An Error.
 */
function runValidationsOnAllSeries(allSeries) {
  if (!allSeries) throw new Error(`chart data was not defined... allSeries was ${allSeries}`);

  allSeries.forEach((series) => {
    validateNameExists(series);
    validateDataExists(series);
  });

  validateXAxisValuesAreSameType(allSeries);
  validateUniqueNamesOnDataSets(allSeries);
}

export { runValidationsOnAllSeries };
