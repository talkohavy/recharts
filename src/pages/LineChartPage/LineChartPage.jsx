import LineChartExample1 from './Examples/LineChartExample1';
import LineChartExample2 from './Examples/LineChartExample2';
import LineChartExample3 from './Examples/LineChartExample3';
import LineChartExample4 from './Examples/LineChartExample4';
import LineChartExample5 from './Examples/LineChartExample5';
import LineChartExample6 from './Examples/LineChartExample6';
import LineChartExample7 from './Examples/LineChartExample7';
import LineChartExample999 from './Examples/LineChartExample8';

export default function HomePage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto border border-black p-6'>
      <h1 className='self-center text-3xl font-bold'>LineChart Examples</h1>

      <div className='size-full space-y-10'>
        <LineChartExample1 />
        <LineChartExample2 />
        <LineChartExample3 />
        <LineChartExample4 />
        <LineChartExample5 />
        <LineChartExample6 />
        <LineChartExample7 />

        <LineChartExample999 />
      </div>
    </div>
  );
}
