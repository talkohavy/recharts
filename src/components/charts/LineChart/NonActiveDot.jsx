import { formatLabel } from '../helpers';

// /** @param {import('recharts').DotProps} props */
export default function NonActiveDot(props) {
  const { cx, cy, stroke, payload, r, dataKey, data, showDotValues } = props;

  if (!payload[dataKey]) return;

  const { showDotValue, dot } = data.find((dotData) => dotData.x === payload.x && dotData.y === payload[dataKey]) ?? {};

  const dotProps = { r: dot?.r ?? r, fill: dot?.fill ?? stroke };
  const isValueVisible = showDotValue ?? showDotValues;

  return (
    <svg>
      <circle cx={cx} cy={cy} {...dotProps} />
      <text x={cx} y={cy} dy={-5 - dotProps.r} textAnchor='middle' fontSize={9}>
        {isValueVisible && formatLabel(payload[dataKey])}
      </text>
    </svg>
  );
}
