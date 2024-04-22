/**
 * @typedef {import('../../../components/charts/types').LineSeries} LineSeries
 */

// Example 1: 1 line
/** @type {Array<LineSeries>} */
const example1 = [
  {
    name: 'line1',
    curveType: 'monotone',
    isDashed: true,
    // showValues: true,
    data: [
      { x: 0, y: 10 },
      { x: 1, y: 2 },
      { x: 2, y: 6 },
      { x: 3, y: 8 },
      { x: 4, y: 14 },
      { x: 5, y: 7 },
    ],
  },
];

export { example1 };
