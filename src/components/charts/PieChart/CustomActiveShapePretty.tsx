import { Sector } from 'recharts';
import { PIE_CHART } from './constants';

const RADIAN = Math.PI / 180;

export default function CustomActiveShapePretty(props) {
  // eslint-disable-next-line
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* Part 1: the piece of the pie */}
      <Sector
        // cx={cx + outerRadius * 0.04 * cos}
        // cy={cy + outerRadius * 0.04 * sin}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Part 2: The arch */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle - 3}
        endAngle={endAngle + 3}
        innerRadius={outerRadius * 1.05}
        outerRadius={outerRadius * 1.06 + 1}
        fill={fill}
      />
      {/* Part 3: crooked pointy line  */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        strokeWidth={outerRadius >= PIE_CHART.xl.outerRadius ? 2 : 1}
        fill='none'
      />
      {/* Part 4: the • dot */}
      <circle cx={ex} cy={ey} r={0.025 * outerRadius} fill={fill} stroke='none' />
      {/* Part 5: The absolute value */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#333'>{`Value: ${value}`}</text>
      {/* Part 6: The % ratio value */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
      {/* Part 3:  */}
      {/* <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text> */}
    </g>
  );
}
