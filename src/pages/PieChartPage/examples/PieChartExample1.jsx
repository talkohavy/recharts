import { useState } from 'react';
import MyPieChart from '../../../components/charts/MyPieChart';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// const data = [
//   { name: 'Group A', value: 111123 * 14 },
//   { name: 'Very Long Group name B', value: 111123 * 0.8 },
//   { name: 'Group C', value: 111123 * 4 },
//   { name: 'Group D', value: 111123 * 1 },
//   { name: 'Group E', value: 111123 * 1 },
//   { name: 'Group F', value: 111123 * 1 },
//   { name: 'Group G', value: 111123 * 1 },
//   { name: 'Group H', value: 111123 * 1 },
//   { name: 'Group I', value: 111123 * 1 },
//   { name: 'Group L', value: 111123 * 1 },
//   { name: 'Group J', value: 111123 * 1 },
//   { name: 'Group K', value: 111123 * 1 },
//   // ------------------------------------
//   // { name: 'Group L', value: 313223 * 1 },
//   // { name: 'Group M', value: 711821 * 1 },
//   // { name: 'Group N', value: 519123 * 1 },
//   // { name: 'Group O', value: 412124 * 1 },
//   // { name: 'Group P', value: 145123 * 1 },
//   // { name: 'Group Q', value: 144123 * 1 },
//   // { name: 'Group R', value: 189125 * 1 },
//   // { name: 'Group S', value: 289125 * 1 },
//   // { name: 'Group T', value: 339125 * 1 },
//   // { name: 'Group U', value: 619125 * 1 },
//   // { name: 'Group V', value: 919125 * 1 },
// ];

export default function PieChartExample1() {
  const [showActiveShape, setShowActiveShape] = useState(true);

  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 overflow-auto border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <MyPieChart data={data} showActiveShape={showActiveShape} />

      <button
        type='button'
        onClick={() => setShowActiveShape(!showActiveShape)}
        className='rounded-md bg-red-500 p-2 text-white hover:rounded-lg hover:bg-red-600'
      >
        Switch
      </button>
    </div>
  );
}
