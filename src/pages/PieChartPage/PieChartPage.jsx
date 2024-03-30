import PieChartExample1 from './examples/PieChartExample1';

export default function BarChartPage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto border border-black p-6'>
      <div className='self-center'>PieChart Examples</div>

      <div className='size-full space-y-10'>
        <PieChartExample1 />
      </div>
    </div>
  );
}
