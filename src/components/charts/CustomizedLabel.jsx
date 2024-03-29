import { formatLabel } from './helpers';

/** @param {import('recharts').LabelProps} props */
export default function CustomizedLabel(props) {
  // The color of each bar is held inside 'fill'
  const { x, y, width, value } = props;

  return (
    <g>
      {/* @ts-ignore */}
      <text x={x + width / 2} y={y - 10} textAnchor='middle' dominantBaseline='middle' className='dark:fill-white'>
        {formatLabel(value)}
      </text>
    </g>
  );
}
