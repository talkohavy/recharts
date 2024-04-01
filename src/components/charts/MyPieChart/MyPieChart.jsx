import { useMemo, useState } from 'react';
import { formatLabel } from '../helpers';
import { PIE_CHART } from './constants';
import { getFontSizeFrom, getPieChart } from './helpers';

/** @typedef {import('../types').SinglePie} SinglePie */

/**
 * @param {{
 *   data: Array<SinglePie>
 * }} props
 */
export default function MyPieChart(props) {
  const { data } = props;

  const [slicesOverrides, setSlicesOverrides] = useState(() => Array.from(Array(data.length)));

  const pieChartData = useMemo(() => getPieChart(data), [data]);

  console.log(pieChartData);

  return (
    <svg
      viewBox={`0 0 ${PIE_CHART.width} ${PIE_CHART.height}`}
      xmlns='http://www.w3.org/2000/svg'
      style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
      // className='min-w-lg'
    >
      {/* <line x1='10' y1='0' x2='990' y2='0' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='100' x2='990' y2='100' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='200' x2='990' y2='200' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='300' x2='990' y2='300' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='400' x2='990' y2='400' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='500' x2='990' y2='500' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='600' x2='990' y2='600' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='700' x2='990' y2='700' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='800' x2='990' y2='800' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='900' x2='990' y2='900' stroke='black' strokeLinecap='round' />
      <line x1='10' y1='1000' x2='990' y2='1000' stroke='black' strokeLinecap='round' />

      <line x1='0' y1='0' x2='0' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='100' y1='0' x2='100' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='200' y1='0' x2='200' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='300' y1='0' x2='300' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='400' y1='0' x2='400' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='500' y1='0' x2='500' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='600' y1='0' x2='600' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='700' y1='0' x2='700' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='800' y1='0' x2='800' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='900' y1='0' x2='900' y2='1000' stroke='black' strokeLinecap='round' />
      <line x1='1000' y1='0' x2='1000' y2='1000' stroke='black' strokeLinecap='round' /> */}

      {pieChartData.map((pieSlice, index) => {
        const { value, path, middleDirection, percentFormatted, percent, color } = pieSlice;
        const xMiddle = PIE_CHART.centerPoint.x + PIE_CHART.outerRadius * 1.06 * middleDirection.xDirection;
        const yMiddle = PIE_CHART.centerPoint.y + PIE_CHART.outerRadius * 1.06 * middleDirection.yDirection;
        const xMiddleBreak = PIE_CHART.centerPoint.x + PIE_CHART.outerRadius * 1.16 * middleDirection.xDirection;
        const yMiddleBreak = PIE_CHART.centerPoint.y + PIE_CHART.outerRadius * 1.16 * middleDirection.yDirection;
        const xMiddleFinal = xMiddleBreak + (middleDirection.xDirection >= 0 ? 1 : -1) * 26;
        const yMiddleFinal = yMiddleBreak;
        const currentSlicesOverride = slicesOverrides?.at(index) ?? {};
        const labelDistanceFromCenter = 0.9 - 0.65 * percent; // <--- range of values goes between 25% - 90% of R from the center.
        const fontSize = getFontSizeFrom(percent);
        const textAnchor = middleDirection.xDirection >= 0 ? 'start' : 'end';

        return (
          <g
            key={index}
            onMouseEnter={() =>
              setSlicesOverrides((prevArr) => prevArr.with(index, { ...prevArr[index], active: true, color: 'black' }))
            }
            onMouseLeave={() =>
              setSlicesOverrides((prevArr) =>
                prevArr.with(index, { ...prevArr[index], active: false, color: undefined }),
              )
            }
          >
            <path
              fill={currentSlicesOverride.color ?? color}
              d={path}
              strokeWidth='4'
              stroke='white'
              className='duration-200'
            />
            <text
              x={PIE_CHART.centerPoint.x + labelDistanceFromCenter * PIE_CHART.outerRadius * middleDirection.xDirection}
              y={PIE_CHART.centerPoint.y + labelDistanceFromCenter * PIE_CHART.outerRadius * middleDirection.yDirection}
              textAnchor='middle'
              style={{ fontSize, fill: 'white', userSelect: 'none', alignmentBaseline: 'central' }}
            >
              {percentFormatted}%
            </text>
            {currentSlicesOverride.active && (
              <g>
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
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
