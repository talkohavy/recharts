import PieChartExample1 from './examples/PieChartExample1';
import PieChartExample2 from './examples/PieChartExample2';
import PieChartExample3 from './examples/PieChartExample3';

export default function BarChartPage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto border border-black p-6'>
      <h1 className='self-center text-3xl font-bold'>PieChart Examples</h1>

      <div className='size-full space-y-10'>
        <PieChartExample1 />
        <PieChartExample2 />
        <PieChartExample3 />
      </div>
    </div>
  );
}
