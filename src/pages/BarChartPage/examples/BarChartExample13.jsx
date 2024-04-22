import { useState } from 'react';
import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const bars = [
  {
    name: 'Type A',
    stackId: 'a',
    color: 'orange',
    data: [
      { x: 'Israel', y: 900 },
      { x: 'USA', y: 800 },
      { x: 'France', y: 500 },
      { x: 'England', y: 700 },
      { x: 'Italy', y: 400 },
      { x: 'Russia', y: 100 },
      { x: 'Germany', y: 200 },
      { x: 'China', y: 300 },
    ],
  },
  {
    name: 'Type B',
    stackId: 'a',
    data: [
      { x: 'Israel', y: 990 },
      { x: 'USA', y: 865 },
      { x: 'France', y: 567 },
      { x: 'England', y: 705 },
      { x: 'Italy', y: 435 },
      { x: 'Russia', y: 165 },
      { x: 'Germany', y: 267 },
      { x: 'China', y: 333 },
    ],
  },
];

export default function BarChartExample13() {
  const [activeBarId, setActiveBarId] = useState('');

  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 13:</div>

      <p>BarChart with onClick event.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          settings={{
            xAxis: { tickAngle: 45 },
          }}
          activeBarId={activeBarId}
          onClickBar={({ name, payload }) => {
            setActiveBarId(`${name}-${payload.x}`);
          }}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
