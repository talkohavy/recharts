import { useMemo } from 'react';
import BarChart from '../../../components/charts/BarChart';
import { COLORS } from '../../../components/charts/constants';

/** @typedef {import('../../../components/charts/types').SingleBar} SingleBar */

/** @type {Array<SingleBar>} */
const barsRaw = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 400 }, // x: 0 | Page A
      { x: 'Page B', y: 300 }, // x: 10 | Page B
      { x: 'Page C', y: 300 }, // x: 20 | Page C
      { x: 'Page D', y: 200 }, // x: 30 | Page D
      { x: 'Page E', y: 280 }, // x: 40 | Page E
      { x: 'Page F', y: 180 }, // x: 50 | Page F
    ],
  },
  {
    name: 'Plains',
    data: [
      { x: 'Page A', y: 680 }, // x: 0 | Page A
      { x: 'Page B', y: 160 }, // x: 10 | Page B
      { x: 'Page C', y: 160 }, // x: 20 | Page C
      { x: 'Page D', y: 140 }, // x: 30 | Page D
      { x: 'Page E', y: 68 }, // x: 40 | Page E
      { x: 'Page F', y: 110 }, // x: 50 | Page F
    ],
  },
];

export default function BarChartExample3() {
  const bars = useMemo(
    () =>
      barsRaw.map((barType, outerIndex) => ({
        ...barType,
        color: COLORS[outerIndex % 20],
        data: barType.data.map((cell) => ({ ...cell, color: COLORS[outerIndex % 20] })),
      })),
    [],
  );

  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 3:</div>

      <p>Multiple colorful BarCharts</p>

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
