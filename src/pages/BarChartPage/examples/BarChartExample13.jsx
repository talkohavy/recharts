import { useState } from 'react';
import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').SingleBar} SingleBar */

/** @type {Array<SingleBar>} */
const bars = [
  {
    name: 'Smoking Zones',
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
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 13:</div>

      <p>BarChart with onClick event.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          showGrid
          showLegend
          xRotateAngle={45}
          activeIndex={activeIndex}
          onClickBar={(_, index) => setActiveIndex(index)}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
