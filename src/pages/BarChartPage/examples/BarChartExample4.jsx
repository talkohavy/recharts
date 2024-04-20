import BarChart from '../../../components/charts/BarChart';
import { COLORS } from '../../../components/charts/constants';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const bars = [
  {
    name: 'Cars',
    color: COLORS[1],
    data: [
      { x: 'Page A', y: 4 },
      { x: 'Page B', y: 6.5 },
      { x: 'Page C', y: 8 },
      { x: 'Page D', y: 2, color: 'red' },
      { x: 'Page E', y: 6 },
      { x: 'Page F', y: 5 },
    ],
  },
];

export default function BarChartExample4() {
  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 4:</div>

      <p>Single out a low valued bar</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          showGrid
          showLegend
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
