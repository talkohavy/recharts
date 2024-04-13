import LineChartExample1 from './Examples/LineChartExample1';
import LineChartExample10 from './Examples/LineChartExample10';
import LineChartExample11 from './Examples/LineChartExample11';
import LineChartExample12 from './Examples/LineChartExample12';
import LineChartExample2 from './Examples/LineChartExample2';
import LineChartExample3 from './Examples/LineChartExample3';
import LineChartExample4 from './Examples/LineChartExample4';
import LineChartExample5 from './Examples/LineChartExample5';
import LineChartExample6 from './Examples/LineChartExample6';
import LineChartExample7 from './Examples/LineChartExample7';
import LineChartExample8 from './Examples/LineChartExample8';
import LineChartExample9 from './Examples/LineChartExample9';

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
        <LineChartExample8 />
        <LineChartExample9 />
        <LineChartExample10 />
        <LineChartExample11 />
        <LineChartExample12 />
      </div>
    </div>
  );
}
