import LineChartExample1 from './Examples/LineChartExample1';
import LineChartExample2 from './Examples/LineChartExample2';
import LineChartExample999 from './Examples/LineChartExample999';

export default function HomePage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto border border-black p-6'>
      <div className='self-center'>LineChart Examples</div>

      <div className='size-full space-y-10'>
        <LineChartExample1 />

        <LineChartExample2 />

        <LineChartExample999 />
      </div>
    </div>
  );
}
