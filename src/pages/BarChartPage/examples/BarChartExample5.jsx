import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const bars = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 14 },
      { x: 'Page B', y: 26.5 },
      { x: 'Page C', y: 28 },
      { x: 'Page D', y: 32 },
      { x: 'Page E', y: 26 },
      { x: 'Page F', y: 35 },
    ],
  },
];

export default function BarChartExample5() {
  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 5:</div>

      <p>A BarChart wrapped in a Box</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          showGrid
          showLegend
          className='rounded-lg border p-2'
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </div>
  );
}
