import { getTextWidth } from './helpers';
import type { LabelProps } from 'recharts';

type CustomizedAxisTickProps = LabelProps & {
  payload: any;
  xTickFormatter: (value: any) => string;
};

export function CustomizedAxisTick(props: CustomizedAxisTickProps) {
  const { x, y, color, payload, angle, textAnchor, fontWeight, fontSize, xTickFormatter } = props;

  const formattedLabel = xTickFormatter(payload.value);
  const textWidth = getTextWidth({ text: formattedLabel });
  const translateXBy = +x! + (angle! < -45 ? -10 : angle ? 0 : textWidth / 2);

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
        {formattedLabel}
      </text>
    </g>
  );
}
