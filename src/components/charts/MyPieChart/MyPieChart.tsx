import { useMemo, useState } from 'react';
import { PIE_CHART } from './constants';
import { getFontSizeFrom, getPieChart } from './helpers';
import PercentLabel from './PercentLabel';
import PieChartActiveShape from './PieChartActiveShape';
import PieChartLegend from './PieChartLegend';
import PieSlice from './PieSlice';

/** @typedef {import('../types').SinglePie} SinglePie */

/**
 * @param {{
 *   data: Array<SinglePie>,
 *   showActiveShape?: boolean,
 * }} props
 */
export default function MyPieChart(props) {
  const { data, showActiveShape = true } = props;

  const [slicesOverrides, setSlicesOverrides] = useState(() => Array.from(Array(data.length)));

  const pieChartData = useMemo(() => {
    if (showActiveShape) {
      PIE_CHART.outerRadius = 250;
    } else {
      PIE_CHART.outerRadius = 385;
    }

    return getPieChart(data);
  }, [data, showActiveShape]);

  return (
    <div className='flex w-full flex-row-reverse items-center justify-between border border-black'>
      <PieChartLegend pieChartData={pieChartData} setSlicesOverrides={setSlicesOverrides} />

      <svg
        viewBox={`0 0 ${PIE_CHART.width} ${PIE_CHART.height}`}
        xmlns='http://www.w3.org/2000/svg'
        style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        // className='min-w-lg'
      >
        {/* <DevelopmentGrid /> */}

        {pieChartData.map((pieSlice, index) => {
          const { value, path, externalArcPath, middleDirection, percentFormatted, percent, color } = pieSlice;

          const currentSliceOverride = slicesOverrides?.at(index) ?? {};
          const labelDistanceFromCenter = 0.9 - 0.65 * percent; // <--- range of values goes between 25% - 90% of R from the center.
          const fontSize = getFontSizeFrom({ percent, showActiveShape });
          const textAnchor = middleDirection.xDirection >= 0 ? 'start' : 'end';

          return (
            <g
              key={index}
              onMouseEnter={() =>
                setSlicesOverrides((prevArr) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: true,
                    fill: '#333',
                    // transform: `translate(${middleDirection.xDirection * 20},${middleDirection.yDirection * 20})`,
                  }),
                )
              }
              onMouseLeave={() =>
                setSlicesOverrides((prevArr) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: false,
                    fill: color,
                    // transform: 'translate(0)'
                  }),
                )
              }
            >
              <PieSlice path={path} color={color} currentSliceOverride={currentSliceOverride} />

              <PercentLabel
                percentFormatted={percentFormatted}
                middleDirection={middleDirection}
                labelDistanceFromCenter={labelDistanceFromCenter}
                fontSize={fontSize}
              />

              <PieChartActiveShape
                isActive={currentSliceOverride.active}
                showFullShape={showActiveShape}
                value={value}
                color={color}
                externalArcPath={externalArcPath}
                percent={percent}
                textAnchor={textAnchor}
                middleDirection={middleDirection}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
