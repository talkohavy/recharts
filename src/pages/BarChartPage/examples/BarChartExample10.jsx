import { useState } from 'react';
import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const bars = [
  {
    name: 'Cars',
    data: [
      { x: 'Page A', y: 9900 },
      { x: 'Page B', y: 705 },
      { x: 'Page C', y: 314 },
      { x: 'Page D', y: 567 },
      { x: 'Page E', y: 202 },
      { x: 'Page F', y: 865 },
    ],
  },
];

export default function BarChartExample10() {
  const [showXAxis, setShowXAxis] = useState(true);
  const [showYAxis, setShowYAxis] = useState(true);

  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 10:</div>

      <p>Ability to show/hide Axises.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          xHide={!showXAxis}
          yHide={!showYAxis}
          showGrid
          showLegend
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>

      <div className='flex items-center justify-start gap-6'>
        <button
          type='button'
          onClick={() => setShowYAxis(!showYAxis)}
          className='rounded-md bg-blue-600 p-3 text-white hover:rounded-lg hover:bg-blue-500 active:bg-blue-800'
        >
          {showYAxis ? 'Hide' : 'Show'} YAxis
        </button>
        <button
          type='button'
          onClick={() => setShowXAxis(!showXAxis)}
          className='rounded-md bg-blue-600 p-3 text-white hover:rounded-lg hover:bg-blue-500 active:bg-blue-800'
        >
          {showXAxis ? 'Hide' : 'Show'} XAxis
        </button>
      </div>
    </div>
  );
}
