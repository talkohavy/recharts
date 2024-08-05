import { Sector } from 'recharts';

const CONVERT_DEGREES_TO_RADIANS = Math.PI / 180;

export default function CustomPieActiveShapeShort(props) {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent, value } = props;

  const sin = -Math.sin(midAngle * CONVERT_DEGREES_TO_RADIANS);
  const cos = Math.cos(midAngle * CONVERT_DEGREES_TO_RADIANS);
  const sx = cx + (outerRadius + 40) * cos;
  const sy = cy + (outerRadius + 40) * sin;
  const xOfTextBox = sx + (cos >= 0 ? 1 : -1) * 12;
  const isFourthQuarter = sin > 0 && cos > 0;

  return (
    <g>
      {/* Part 1: the piece of the pie */}
      <Sector
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
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius * 1.05}
        outerRadius={outerRadius * 1.06 + 1}
        fill={fill}
      />
      <g transform={isFourthQuarter ? `translate(${-cos * 10},${-sin * 10})` : undefined}>
        {/* Part 3: The absolute value */}
        <text x={xOfTextBox} y={sy} textAnchor='middle' fill='#333'>{`Value: ${value}`}</text>
        {/* Part 4: The % ratio value */}
        <text x={xOfTextBox} y={sy} dy={18} textAnchor='middle' fill='#999'>
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    </g>
  );
}
