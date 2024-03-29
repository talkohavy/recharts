import { useMemo } from 'react';
import {
  Bar,
  BarChart as BarChartBase,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomizedLabel from '../CustomizedLabel';
import CustomTooltip from '../CustomTooltip';
import { formatLabel } from '../helpers';

const DEFAULT_BAR_COLOR = '#355cff';

/**
 * @typedef {import('../types').SingleBar} SingleBar
 */

/**
 * @param {{
 *   bars: Array<SingleBar>,
 *   gapFromTop?: {amount?: number, unit?: 'percent' | 'absolute'},
 *   showGrid?: boolean,
 *   showLegend?: boolean,
 *   xRotateAngle?: number,
 *   xDown?: number,
 *   xPadding?: {left?: number, right?: number},
 *   xHeight?: number,
 *   yWidth?: number,
 *   barBackgroundColor?: string,
 *   gridColor?: string,
 *   margin?: { top?: number, right?: number, left?: number, bottom?: number }
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function BarChart(props) {
  const {
    bars,
    showGrid,
    showLegend,
    gapFromTop = { amount: 20, unit: 'percent' },
    xRotateAngle,
    xDown,
    xPadding,
    xHeight,
    yWidth,
    barBackgroundColor = 'transparent',
    gridColor = '#ddd',
    margin,
    className,
    style,
  } = props;

  const transformedDataForRecharts = useMemo(() => {
    const transformedDataByKey = {};

    bars.forEach((barType) => {
      barType.data.forEach(({ x, y }) => {
        transformedDataByKey[x] ??= { x };
        transformedDataByKey[x][barType.name] = y;
      });
    });

    return Object.values(transformedDataByKey);
  }, [bars]);

  // `domain` is needed in order to know where to place the max point of the YAxis.
  const domain = useMemo(() => {
    const { amount, unit } = gapFromTop;
    if (amount === 0) return;

    if (unit === 'absolute') {
      /** @type {import('../types').AxisDomain} */
      const domain = [0, `dataMax + ${amount}`];

      return domain;
    }

    const maxYValue = bars.reduce((maxValue, currentBarType) => {
      const maxValueInCurrentData = currentBarType.data.reduce(
        (maxValue, { y: currentY }) => (currentY > maxValue ? currentY : maxValue),
        maxValue,
      );

      return maxValueInCurrentData > maxValue ? maxValueInCurrentData : maxValue;
    }, Number.NEGATIVE_INFINITY);

    const increaseBy = Math.ceil((maxYValue * amount) / 100);
    /** @type {import('../types').AxisDomain} */
    const domain = [0, `dataMax + ${increaseBy}`];

    return domain;
  }, [bars, gapFromTop]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChartBase
        data={transformedDataForRecharts}
        margin={margin}
        className={className}
        style={style}
        // layout='horizontal' // <--- default is 'horizontal'
        // barCategoryGap='10%' // <--- gap between bars. Hard to make this generic. The default seems to do a pretty good job.
      >
        {/* MUST come before XAxis & YAxis */}
        {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray='5 5' />}

        <XAxis
          type='category'
          dataKey='x'
          height={xHeight}
          angle={xRotateAngle}
          dy={xDown}
          padding={xPadding} // <--- you can use this to removed padding between the first bar and the Y axis, and the last bar and the chart axis.
          stroke='#666'
          xAxisId='bottom'
          tickFormatter={formatLabel} // <--- only passes the string value.
          // tick={CustomAxisTick} // <--- passes everything! x, y, width, height, everything! You'll need to handle the positioning as well. format the entire tick.
        />
        <YAxis width={yWidth} domain={domain} tickFormatter={formatLabel} type='number' stroke='#666' yAxisId='left' />

        <Tooltip content={CustomTooltip} />

        {showLegend && <Legend />}

        {bars.map(({ name, data, unit, color, borderColor }) => {
          const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

          const barProps = {
            fill: barColorInLegend,
            stroke: borderColor,
            dataKey: name,
          };

          return (
            <Bar
              key={name}
              {...barProps}
              yAxisId='left'
              xAxisId='bottom'
              unit={unit}
              background={{ fill: barBackgroundColor }}
              // barSize={40} // <--- it is best to leave this as automatically calculated
              // label={{ position: 'top' }} // <--- commented out! Since I'm using a custom label renderer.
            >
              <LabelList dataKey={name} content={CustomizedLabel} />
              {data.map(({ color: specificColor }, barTypeCellIndex) => (
                <Cell key={`cell-${name}-${barTypeCellIndex}`} fill={specificColor ?? color ?? DEFAULT_BAR_COLOR} />
              ))}
            </Bar>
          );
        })}
      </BarChartBase>
    </ResponsiveContainer>
  );
}
