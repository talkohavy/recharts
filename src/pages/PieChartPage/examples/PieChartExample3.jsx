import PieChart from '../../../components/charts/PieChart';

/** @typedef {import('../../../components/charts/types').SinglePie} SinglePie */

/** @type {Array<SinglePie>} */
const data = [
  { name: 'Group A', value: 99 },
  { name: 'Group B', value: 28 },
  { name: 'Group C', value: 4 },
  { name: 'Group D', value: 21 },
  { name: 'Group E', value: 31 },
  { name: 'Group F', value: 51 },
  { name: 'Group G', value: 21 },
  { name: 'Group H', value: 31 },
  { name: 'Group I', value: 71 },
  { name: 'Group J', value: 41 },
  { name: 'Group K', value: 51 },
  { name: 'Group L', value: 11 },
];

export default function PieChartExample3() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 3:</div>

      <p>BarChart of size 'xl' with a legend.</p>

      <div className='size-full max-h-lg max-w-lg'>
        <PieChart data={data} size='lg' showLegend style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }} />
      </div>
    </div>
  );
}
