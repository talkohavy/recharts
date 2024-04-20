import { COLORS } from '../../../components/charts/constants';
import LineChart from '../../../components/charts/LineChart';

/**
 * @typedef {import('../../../components/charts/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/types').SingleLine} SingleLine
 * @typedef {import('../../../components/charts/types').ReferenceLine} ReferenceLine
 */

/** @type {Array<SingleLine>} */
const lines = [
  {
    name: 'line1',
    color: COLORS[6],
    curveType: 'monotone',
    isDashed: true,
    showValues: true,
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 150, showValue: false },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export default function LineChartExample9() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 9:</div>

      <p>LineChart has values above dots</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          showGrid
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
