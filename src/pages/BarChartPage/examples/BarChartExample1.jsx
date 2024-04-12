import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').SingleBar} SingleBar */

/** @type {Array<SingleBar>} */
const bars = [
  {
    name: 'Cars',
    color: '#355cff',
    data: [
      { x: 'Page A', y: 400000000 }, // x: 0 | Page A
      { x: 'Page B', y: 300000000 }, // x: 10 | Page B
      { x: 'Page C', y: 800000000 }, // x: 20 | Page C
      { x: 'Page D', y: 200000000 }, // x: 30 | Page D
      { x: 'Page E', y: 200000000 }, // x: 40 | Page E
      { x: 'Page F', y: 100000000 }, // x: 50 | Page F
    ],
  },
];

export default function BarChartExample1() {
  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <p>A single BarChart with 1 single color</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          yLabel='Cars'
          showGrid
          showLegend
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
