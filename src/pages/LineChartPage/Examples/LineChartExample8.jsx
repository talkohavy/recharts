import { COLORS } from '../../../components/charts/constants';
import LineChart from '../../../components/charts/LineChart';

/**
 * @typedef {import('../../../components/charts/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/types').LineSeries} LineSeries
 * @typedef {import('../../../components/charts/types').ReferenceLine} ReferenceLine
 */

/** @type {Array<LineSeries>} */
const lines = [
  {
    name: 'line1',
    color: COLORS[5],
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 150 },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export default function LineChartExample8() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 8:</div>

      <p>A Line chart as a Card</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          settings={{ grid: { show: true } }}
          className='rounded-lg border p-4 font-thin'
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </div>
  );
}
