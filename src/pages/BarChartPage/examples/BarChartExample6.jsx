import BarChart from '../../../components/charts/BarChart';

/**
 * @typedef {import('../../../components/charts/types').SingleBar} SingleBar
 * @param label
 */

/** @type {Array<SingleBar>} */
const bars = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 1000000000 },
      { x: 'Page B', y: 800200026.5 },
      { x: 'Page C', y: 700110028 },
      { x: 'Page D', y: 900032 },
      { x: 'Page E', y: 117013026 },
      { x: 'Page F very long too long', y: 688658035 },
    ],
  },
];

export default function BarChartExample6() {
  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 6:</div>

      <p>Big numbers are formatted with K, M & B suffixes</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          xRotateAngle={-45}
          xHeight={60}
          xDown={20}
          showGrid
          showLegend
          margin={{ top: 30, right: 20, bottom: 10, left: 30 }}
          className='rounded-lg border'
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </div>
  );
}
