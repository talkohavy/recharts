import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const bars = [
  {
    name: 'Cars',
    stackId: 'a',
    data: [
      { x: 'Page A', y: 0 },
      { x: 'Page B', y: 500 },
      { x: 'Page C', y: 1000 },
      { x: 'Page D', y: 800 },
      { x: 'Page E', y: 200 },
      { x: 'Page F', y: 50 },
    ],
  },
  {
    name: 'Planes',
    color: 'lightgreen',
    stackId: 'a',
    data: [
      { x: 'Page A', y: 1000 },
      { x: 'Page B', y: 500 },
      { x: 'Page C', y: 0 },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 100 },
      { x: 'Page F', y: 30 },
    ],
  },
];

export default function BarChartExample11() {
  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 11:</div>

      <p>Stacked BarChart.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          settings={{
            general: { showValues: true },
            legend: { show: true },
          }}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
