import { formatLabel } from './helpers';

/** @param {import('recharts').LabelProps} props */
export default function CustomizedLabel(props) {
  // The color of each bar is stored in 'fill'
  const { x, y, width, height, value, fontSize, fontWeight, position } = props;
  // if stackedBar, put number in middle of Bar, else - put above.
  const updatedYPosition = position === 'center' ? +y + +height / 2 : +y - 10;

  return (
    <g>
      <text
        // This calculation below assumes that textAnchor will always be set to 'end'.
        x={+x + +width / 2}
        y={updatedYPosition}
        textAnchor='middle'
        dominantBaseline='middle'
        className='pointer-events-none dark:fill-white'
        style={{ fontSize, fontWeight }}
      >
        {formatLabel(value)}
      </text>
    </g>
  );
}
