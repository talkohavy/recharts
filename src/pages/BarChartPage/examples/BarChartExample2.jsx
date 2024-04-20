import { useMemo } from 'react';
import BarChart from '../../../components/charts/BarChart';
import { COLORS } from '../../../components/charts/constants';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const barsRaw = [
  {
    name: 'Cars',
    color: 'black',
    data: [
      { x: 'Page A', y: 34 }, // x: 0 | Page A
      { x: 'Page B', y: 43 }, // x: 10 | Page B
      { x: 'Page C', y: 18 }, // x: 20 | Page C
      { x: 'Page D', y: 82 }, // x: 30 | Page D
      { x: 'Page E', y: 92 }, // x: 40 | Page E
      { x: 'Page F', y: 71 }, // x: 50 | Page F
    ],
  },
];

export default function BarChartExample2() {
  const bars = useMemo(
    () =>
      barsRaw.map((barType) => ({
        ...barType,
        data: barType.data.map((cell, innerIndex) => ({ ...cell, color: COLORS[innerIndex % 20] })),
      })),
    [],
  );

  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 2:</div>

      <p>A single colorful BarChart</p>

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
