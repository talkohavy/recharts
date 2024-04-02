import { formatLabel } from '../helpers';
import { PIE_CHART } from './constants';

export default function PieChartActiveShape({
  isActive,
  showFullShape,
  value,
  color,
  externalArcPath,
  percent,
  middleDirection,
  textAnchor,
}) {
  const xMiddle = PIE_CHART.centerPoint.x + PIE_CHART.outerRadius * 1.08 * middleDirection.xDirection;
  const yMiddle = PIE_CHART.centerPoint.y + PIE_CHART.outerRadius * 1.08 * middleDirection.yDirection;
  const xMiddleBreak = PIE_CHART.centerPoint.x + PIE_CHART.outerRadius * 1.16 * middleDirection.xDirection;
  const yMiddleBreak = PIE_CHART.centerPoint.y + PIE_CHART.outerRadius * 1.16 * middleDirection.yDirection;
  const xMiddleFinal = xMiddleBreak + (middleDirection.xDirection >= 0 ? 1 : -1) * 26;
  const yMiddleFinal = yMiddleBreak;

  return (
    <g>
      {isActive && (
        <>
          {/* Part 1: The arc  */}
          <path d={externalArcPath} stroke='none' fill={color} />

          {showFullShape && (
            <>
              {/* Part 2: The • dot  */}
              <circle cx={xMiddle} cy={yMiddle} r={5} fill='black' stroke='none' />
              {/* Part 3: crooked pointy line  */}
              <path
                d={`M${xMiddle},${yMiddle}L${xMiddleBreak},${yMiddleBreak}L${xMiddleFinal},${yMiddleFinal}`}
                stroke='black'
                strokeWidth={2}
                fill='none'
              />
              {/* Part 5: The absolute value */}
              <text
                x={xMiddleFinal + (middleDirection.xDirection >= 0 ? 1 : -1) * 12}
                y={yMiddleFinal}
                textAnchor={textAnchor}
                fill='#333'
                style={{ fontSize: 30 }}
              >{`Value: ${formatLabel(value)}`}</text>
              {/* Part 6: The % ratio value */}
              <text
                x={xMiddleFinal + (middleDirection.xDirection >= 0 ? 1 : -1) * 12}
                y={yMiddleFinal}
                dy={35}
                textAnchor={textAnchor}
                fill='#999'
                style={{ fontSize: 30 }}
              >
                {`(${(percent * 100).toFixed(2)}%)`}
              </text>
            </>
          )}
        </>
      )}
    </g>
  );
}
