/**
 * @typedef {import('../types').SingleBar} SingleBar
 * @typedef {import('../types').SingleLine} SingleLine
 */

/**
 * @param {Array<SingleBar> | Array<SingleLine>} data
 */
function getNamesObject(data) {
  const obj = {};

  data.forEach(({ name }) => (obj[name] = null));

  return obj;
}

export { getNamesObject };
