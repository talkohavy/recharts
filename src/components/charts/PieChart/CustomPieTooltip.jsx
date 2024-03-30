/** @typedef {import('recharts').TooltipProps<string,string>} TooltipProps */

/** @param {TooltipProps} props */
export default function CustomPieTooltip(props) {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className='whitespace-nowrap rounded-md border border-neutral-400 bg-white bg-opacity-50 p-2.5 pb-3'>
        <p>{label}</p>
        <ul className='pt-1 text-blue-600'>
          {payload.map(({ name, color }, index) => (
            <li key={index} style={{ color }}>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
