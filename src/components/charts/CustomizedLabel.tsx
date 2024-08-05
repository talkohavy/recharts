import { formatLabel } from './helpers';
import type { LabelProps } from 'recharts';

/**
 * @description
 * NOTE!!! The color of each bar is stored in 'fill'.
 */
export default function CustomizedLabel(props: LabelProps) {
  const { x, y, width, height, value, fontSize, fontWeight, position } = props;

  // if it's a stackedBar, put number in middle of Bar, else - put above.
  const updatedYPosition = position === 'center' ? +y! + +height! / 2 : +y! - 10;

  // This calculation below assumes that textAnchor will always be set to 'end'.
  const xPosition = +x! + +width! / 2;

  return (
    <text
      x={xPosition}
      y={updatedYPosition}
      textAnchor='middle'
      dominantBaseline='middle'
      className='pointer-events-none dark:fill-white'
      style={{ fontSize, fontWeight }}
    >
      {formatLabel(value)}
    </text>
  );
}
