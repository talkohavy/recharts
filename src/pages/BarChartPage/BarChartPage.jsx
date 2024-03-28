import BarChartExample1 from './examples/BarChartExample1';
import BarChartExample2 from './examples/BarChartExample2';
import BarChartExample3 from './examples/BarChartExample3';
import BarChartExample4 from './examples/BarChartExample4';
import BarChartExample5 from './examples/BarChartExample5';

export default function BarChartPage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto border border-black p-6'>
      <div className='self-center'>BarChart Examples</div>

      <div className='size-full space-y-10'>
        <BarChartExample1 />

        <BarChartExample2 />

        <BarChartExample3 />

        <BarChartExample4 />

        <BarChartExample5 />
      </div>
    </div>
  );
}
