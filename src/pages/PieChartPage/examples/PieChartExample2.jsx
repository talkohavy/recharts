import PieChart from '../../../components/charts/PieChart';

/** @typedef {import('../../../components/charts/types').SinglePie} SinglePie */

/** @type {Array<SinglePie>} */
const data = [
  { name: 'Group A', value: 99 },
  { name: 'Group B', value: 0.8 },
  { name: 'Group C', value: 4 },
  { name: 'Group D', value: 1 },
  { name: 'Group E', value: 1 },
  { name: 'Group F', value: 1 },
  { name: 'Group G', value: 1 },
  { name: 'Group H', value: 1 },
  { name: 'Group I', value: 1 },
  { name: 'Group J', value: 1 },
  { name: 'Group K', value: 1 },
  { name: 'Group L', value: 1 },
];

export default function PieChartExample2() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 2:</div>

      <p>BarChart of size 'xl' with many pie piece below 2%.</p>

      <div className='size-full max-h-lg max-w-lg'>
        <PieChart data={data} size='xl' style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }} />
      </div>
    </div>
  );
}
