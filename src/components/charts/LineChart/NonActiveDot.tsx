import { formatLabel } from '../helpers';
import type { DotProps } from 'recharts';

type ActiveDotProps = DotProps & {
  payload: any;
  dataKey: string;
  data: Array<any>;
  showChartValues: boolean;
  showLineValues: boolean;
};

export default function NonActiveDot(props: ActiveDotProps) {
  const { cx, cy, payload, dataKey, data, r, stroke, opacity, showChartValues, showLineValues } = props;

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
