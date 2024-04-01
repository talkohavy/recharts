import MyPieChart from '../../../components/charts/MyPieChart';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// const data = [
//   { name: 'Group A', value: 111123 * 14 },
//   { name: 'Group B', value: 111123 * 0.8 },
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
// ];

export default function PieChartExample1() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 overflow-auto border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <MyPieChart data={data} />
    </div>
  );
}
