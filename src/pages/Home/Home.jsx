import Example1 from './Examples/Example1';
import Example2 from './Examples/Example2';
import Example999 from './Examples/Example999';

export default function HomePage() {
  return (
    <div className='flex size-full flex-col items-start justify-start gap-10 overflow-auto border border-black p-6'>
      <div className='self-center'>LineChart Examples</div>

      <div className='size-full space-y-10'>
        <Example1 />

        <Example2 />

        <Example999 />
      </div>
    </div>
  );
}
