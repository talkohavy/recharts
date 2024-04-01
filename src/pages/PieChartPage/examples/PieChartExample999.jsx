import { useState } from 'react';
import PieChart from '../../../components/charts/PieChart/PieChart';

/** @typedef {import('../../../components/charts/types').SinglePie} SinglePie */

/** @type {Array<SinglePie>} */
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

export default function PieChartExample1() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pieChartCellProps, setPieChartCellProps] = useState(null);

  const handleLegendItemHover = (_props, index) => {
    if (index === -1) return setPieChartCellProps();

    setPieChartCellProps(data.map((_, currentIndex) => ({ fillOpacity: currentIndex === index ? 1 : 0.4 })));
  };

  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <p>PieChart size 'md' with only 4 slices.</p>

      <div className='size-full max-h-lg max-w-lg'>
        <PieChart
          data={data}
          size='lg'
          activeIndex={activeIndex}
          onHoverSetActive={(_, index) => setActiveIndex(index)}
          onHoverLegendItem={handleLegendItemHover}
          pieChartCellProps={pieChartCellProps}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </div>
  );
}
