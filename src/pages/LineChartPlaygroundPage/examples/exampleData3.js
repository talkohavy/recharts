import { COLORS } from '../../../components/charts/constants';

/**
 * @typedef {import('../../../components/charts/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/types').LineSeries} LineSeries
 * @typedef {import('../../../components/charts/types').ReferenceLine} ReferenceLine
 */

// Example 3: 1 line with 1 singled out dot
/** @type {Array<LineSeries>} */
const example3 = [
  {
    name: 'line1',
    color: COLORS[4],
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 151, showValue: true, dot: { r: 12, fill: 'red', stroke: 'black' } },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export { example3 };
