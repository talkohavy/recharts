import { formatLabel } from './helpers';

/** @typedef {import('recharts').TooltipProps<string,string>} TooltipProps */

/** @param {TooltipProps} props */
export default function CustomTooltip(props) {
  const { active, payload, label, separator } = props;

  if (active && payload && payload.length) {
    return (
      <div className='whitespace-nowrap rounded-md border border-neutral-400 bg-white bg-opacity-90 p-2.5 pb-3'>
        <p className='font-bold'>{label}</p>
        <ul className='pt-1 text-blue-600'>
          {payload.map(({ name, value, color, unit }, index) => (
            <li key={index} style={{ color }}>
              <span>{name}</span>
              <span>{separator}</span>
              <span>{formatLabel(value)}</span>
              <span>{unit}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
