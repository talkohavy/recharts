import { getTextWidth } from './helpers';

/**
 * @param {import('recharts').LabelProps & {
 *   payload: any,
 *   xTickFormatter: (value: any) => string
 * }} props
 */
export function CustomizedAxisTick(props) {
  const { x, y, color, payload, angle, textAnchor, fontWeight, fontSize, xTickFormatter } = props;

  const formattedLabel = xTickFormatter(payload.value);
  const textWidth = getTextWidth({ text: formattedLabel });
  const translateXBy = +x + (angle < -45 ? -10 : angle ? 0 : textWidth / 2);

  return (
    <g transform={`translate(${translateXBy},${y})`}>
      <title>{formattedLabel}</title>
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
        {formattedLabel}
      </text>
    </g>
  );
}
