import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').SingleBar} SingleBar */

/** @type {Array<SingleBar>} */
const bars = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 705 },
      { x: 'Page C', y: 314 },
      { x: 'Page D', y: 567 },
      { x: 'Page E', y: 202 },
      { x: 'Page F', y: 865 },
    ],
  },
];

export default function BarChartExample8() {
  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 8:</div>

      <p>A suffix for YAxis. Notice that it only affects the y axis.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          showGrid
          showLegend
          yTickSuffix='cm'
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
