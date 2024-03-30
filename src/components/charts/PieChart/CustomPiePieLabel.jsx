import { getFontSizeFrom, getSizeFromRadius } from './constants';

const RADIAN = Math.PI / 180;
const SMALLEST_PERCENT_VISIBLE = 0.75; // <--- pie pieces below 0.75% will not show the label!

/** @param {import('recharts').PieLabelRenderProps} props */
export default function CustomPiePieLabel(props) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  const percentValueOutOf100 = percent * 100;
  const labelDistanceFromCenter = 0.9 - 0.65 * percent; // <--- range of values goes between 25% - 90% of R from the center.

  // @ts-ignore
  const radius = innerRadius + (outerRadius - innerRadius) * labelDistanceFromCenter;
  // @ts-ignore
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // @ts-ignore
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const size = getSizeFromRadius(outerRadius);
  const fontSize = getFontSizeFrom({ size, percent: percentValueOutOf100 });
  const displayLabel = percentValueOutOf100 >= SMALLEST_PERCENT_VISIBLE && `${percentValueOutOf100.toFixed(0)}%`;

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor='middle'
      dominantBaseline='central'
      className='pointer-events-none'
      style={{ fontSize }}
    >
      {displayLabel}
    </text>
  );
}
