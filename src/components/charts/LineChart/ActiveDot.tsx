// /** @param {import('recharts').DotProps} props */
export default function ActiveDot(props) {
  const { cx, cy, payload, dataKey, fill, r, data } = props;

  if (!payload[dataKey]) return;

  const { dot } = data.find((dotData) => dotData.x === payload.x && dotData.y === payload[dataKey]) ?? {};

  const dotProps = { r: (dot?.r ?? r) * 1.1 + 2, fill: dot?.fill ?? fill, stroke: dot?.stroke ?? 'white' };
  // const isValueVisible = showDotValue ?? showDotValues;

  return (
    <svg>
      <circle cx={cx} cy={cy} {...dotProps} />
      {/* <text x={cx} y={cy} dy={4} textAnchor='middle' fontSize={9}>
        {isValueVisible && formatLabel(payload[dataKey])}
      </text> */}
    </svg>
  );
}
