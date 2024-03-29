import { formatLabel } from './helpers';

/** @param {import('recharts').LabelProps} props */
export default function CustomizedLabel(props) {
  // The color of each bar is stored in 'fill'
  const { x, y, width, value, fontSize, fontWeight } = props;

  return (
    <g>
      <text
        x={+x + +width / 2}
        y={+y - 10}
        textAnchor='middle'
        dominantBaseline='middle'
        className='dark:fill-white'
        style={{ fontSize, fontWeight }}
      >
        {formatLabel(value)}
      </text>
    </g>
  );
}
