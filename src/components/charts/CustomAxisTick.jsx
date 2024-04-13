import { formatLabel } from './helpers';

/** @param {import('recharts').LabelProps & {payload: any}} props */
export function CustomizedAxisTick(props) {
  const { x, y, color, payload, angle, textAnchor, fontWeight, fontSize } = props;
  const translateXBy = +x + (angle < -45 ? -10 : angle ? 0 : 30);

  return (
    <g transform={`translate(${translateXBy},${y})`}>
      <title>{payload.value}</title>
      <text
        x={0}
        y={0}
        dy={16}
        stroke='none'
        textAnchor={textAnchor}
        fill={color}
        transform={angle ? `rotate(${angle})` : undefined}
        style={{ fontSize, fontWeight }}
      >
        {formatLabel(payload.value)}
      </text>
    </g>
  );
}
