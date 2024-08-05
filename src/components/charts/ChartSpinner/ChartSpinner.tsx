export default function ChartSpinner() {
  return (
    <div className='absolute inset-0 z-10 flex size-full items-center justify-center bg-[#263038] opacity-80'>
      <div className='relative inline-block size-16 animate-spin rounded-full border-7 border-dotted border-slate-100' />
    </div>
  );
}
