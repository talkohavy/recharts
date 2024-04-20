/**
 * @typedef {import('../types').SingleBar} SingleBar
 * @typedef {import('../types').SingleLine} SingleLine
 */

/**
 * @param {Array<SingleLine | SingleBar>} dataArr
 */
function getLengthOfLongestData(dataArr) {
  return dataArr.reduce((maxLength, { data }) => {
    if (maxLength < data.length) return data.length;

    return maxLength;
  }, 0);
}

export { getLengthOfLongestData };
