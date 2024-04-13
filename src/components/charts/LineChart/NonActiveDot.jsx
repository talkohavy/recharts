import { formatLabel } from '../helpers';

// /** @param {import('recharts').DotProps} props */
export default function NonActiveDot(props) {
  const { cx, cy, stroke, payload, dataKey, data, index, showValues } = props;

  const { showValue, dot } = data[index] ?? {};

  const dotProps = { r: dot?.r ?? 3, fill: dot?.fill ?? stroke };
  const isValueVisible = showValue ?? showValues;

  return (
    <svg>
      <circle cx={cx} cy={cy} {...dotProps} />
      <text x={cx} y={cy} dy={-10} textAnchor='middle' fontSize={9}>
        {isValueVisible && formatLabel(payload[dataKey])}
      </text>
    </svg>
  );
}
