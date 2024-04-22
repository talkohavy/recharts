import { formatLabel } from '../helpers';

// /** @param {import('recharts').DotProps} props */
export default function NonActiveDot(props) {
  const { cx, cy, stroke, payload, r, dataKey, opacity, data, showChartValues, showLineValues } = props;

  if (!payload[dataKey]) return;

  const { showValue: showDotValue, dot } =
    data.find((dotData) => dotData.x === payload.x && dotData.y === payload[dataKey]) ?? {};

  const dotProps = { r: dot?.r ?? r, fill: dot?.fill ?? stroke, stroke: dot?.stroke, opacity };
  const isValueVisible = showDotValue ?? showLineValues ?? showChartValues;
  const dyTextAboveDot = -5 - dotProps.r;

  return (
    <svg>
      <circle cx={cx} cy={cy} {...dotProps} />
      <text x={cx} y={cy} dy={dyTextAboveDot} textAnchor='middle' fontSize={9}>
        {isValueVisible && formatLabel(payload[dataKey])}
      </text>
    </svg>
  );
}
