/** @typedef {import('recharts').TooltipProps<string,string>} TooltipProps */

/** @param {TooltipProps} props */
export default function CustomTooltip(props) {
  const { active, payload, label, separator } = props;

  if (active && payload && payload.length) {
    return (
      <div className='whitespace-nowrap rounded-md border border-neutral-400 bg-white bg-opacity-90 p-2.5 pb-3'>
        <p>{label}</p>
        <ul className='pt-1 text-blue-600'>
          {payload.map(({ name, value, color, unit }, index) => (
            <li key={index} style={{ color }}>
              <span>{name}</span>
              <span>{separator}</span>
              {/* @ts-ignore */}
              <span>{Intl.NumberFormat().format(value)}</span>
              <span>{unit}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
// const getIntroOfPage = (label) => {
//   if (label === 'Page A') {
//     return "Page A is about men's clothing";
//   }
//   if (label === 'Page B') {
//     return "Page B is about women's dress";
//   }
//   if (label === 'Page C') {
//     return "Page C is about women's bag";
//   }
//   if (label === 'Page D') {
//     return 'Page D is about household goods';
//   }
//   if (label === 'Page E') {
//     return 'Page E is about food';
//   }
//   if (label === 'Page F') {
//     return 'Page F is about baby food';
//   }
//   return '';
// };

// export default function CustomTooltip({ active, payload, label }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className='w-52 border bg-white bg-opacity-80 p-2.5'>
//         <p className='font-bold text-[#666]'>{`${label} : ${payload[0].value}`}</p>
//         <p className='border'>{getIntroOfPage(label)}</p>
//         <p className='text-[#999]'>Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// }
