import { COLORS } from '../../../components/charts/constants';

/**
 * @typedef {import('../../../components/charts/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/types').LineSeries} LineSeries
 * @typedef {import('../../../components/charts/types').ReferenceLine} ReferenceLine
 */

// Example 5: 1 very long line, with 1 null in the middle & 2 missing values
/** @type {Array<LineSeries>} */
const example5 = [
  {
    name: 'line1',
    color: COLORS[7],
    curveType: 'monotone',
    data: [
      { x: 0, y: 100 },
      { x: 1, y: 300 },
      { x: 2, y: 150 },
      { x: 3, y: 200 },
      { x: 4, y: 80 },
      { x: 5, y: 180 },
      { x: 6, y: 225 },
      { x: 7, y: 150 },
      { x: 8, y: 80 },
      { x: 9, y: 70 },
      { x: 12, y: 230 },
      { x: 13, y: 245 },
      { x: 14, y: 160 },
      { x: 15, y: 145 },
      { x: 16, y: 115 },
      { x: 17, y: 190 },
      { x: 18, y: 200 },
      { x: 19, y: 230 },
      { x: 20, y: null },
      { x: 20, y: 120 },
      { x: 21, y: 80 },
      { x: 22, y: 60 },
      { x: 23, y: 80 },
      { x: 24, y: 120 },
    ],
  },
];

export { example5 };
