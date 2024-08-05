/**
 * @typedef {import('../types').BarSeries} BarSeries
 * @typedef {import('../types').LineSeries} LineSeries
 */

/**
 * @param {Array<LineSeries | BarSeries>} dataArr
 */
function getLengthOfLongestData(dataArr) {
  return dataArr.reduce((maxLength, { data }) => {
    if (maxLength < data.length) return data.length;

    return maxLength;
  }, 0);
}

export { getLengthOfLongestData };
