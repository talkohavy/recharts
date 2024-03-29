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
import { CustomizedAxisTick } from '../CustomAxisTick';
import CustomizedLabel from '../CustomizedLabel';
import CustomTooltip from '../CustomTooltip';
import { formatLabel, getHeight } from '../helpers';

const DEFAULT_BAR_COLOR = '#355cff';

/** @typedef {import('../types').SingleBar} SingleBar */

/**
 * @param {{
 *   bars: Array<SingleBar>,
 *   showGrid?: boolean | {showHorizontalLines?: boolean, showVerticalLines?: boolean},
 *   showLegend?: boolean,
 *   xRotateAngle?: number,
 *   xPadding?: {left?: number, right?: number},
 *   xHide?: boolean,
 *   yWidth?: number,
 *   yHide?: boolean,
 *   yTickSuffix?: string,
 *   xTickColor?: string,
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
    xRotateAngle,
    xPadding,
    xHide,
    yWidth,
    yHide,
    yTickSuffix,
    xTickColor = '#666',
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

  // `domain` was once needed in order to know where to place the max point of the YAxis. Now I simply use y padding top of 18.
  // const domain = useMemo(() => {
  //   gapFromTop = { amount: 20, unit: 'percent' },
  // *   gapFromTop?: {amount?: number, unit?: 'percent' | 'absolute'},
  //   const { amount, unit } = gapFromTop;
  //   if (amount === 0) return;

  //   if (unit === 'absolute') {
  //     /** @type {import('../types').AxisDomain} */
  //     const domain = [0, `dataMax + ${amount}`];

  //     return domain;
  //   }

  //   const maxYValue = bars.reduce((maxValue, currentBarType) => {
  //     const maxValueInCurrentData = currentBarType.data.reduce(
  //       (maxValue, { y: currentY }) => (currentY > maxValue ? currentY : maxValue),
  //       maxValue,
  //     );

  //     return maxValueInCurrentData > maxValue ? maxValueInCurrentData : maxValue;
  //   }, Number.NEGATIVE_INFINITY);

  //   const increaseBy = Math.ceil((maxYValue * amount) / 100);
  //   /** @type {import('../types').AxisDomain} */
  //   const domain = [0, `dataMax + ${increaseBy}`];

  //   return domain;
  // }, [bars, gapFromTop]);

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
        {showGrid && (
          <CartesianGrid
            stroke={gridColor}
            horizontal={!!(showGrid === true || showGrid.showHorizontalLines)}
            vertical={!!(showGrid === true || showGrid.showVerticalLines)}
            strokeDasharray='5 5'
            syncWithTicks
          />
        )}

        <XAxis
          type='category'
          dataKey='x'
          height={getHeight(xRotateAngle)}
          angle={xRotateAngle}
          padding={xPadding} // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis.
          hide={xHide}
          textAnchor='end' // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
          tick={CustomizedAxisTick} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          color={xTickColor}
          stroke='#666' // <--- this is the color of the xAxis line itself!
          xAxisId='bottom'
          // unit=' cm' // <--- You CANNOT use this when using `tick`, which you are. A. because it doesn't render it, and B. because some ticks will not be displayed. You can use only when using the default tick renderer, add this will automatically add a unit suffix to your xAxis ticks.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatLabel} // <--- only passes the string value as an argument.
        />
        <YAxis
          unit={yTickSuffix} // <--- you can add a unit suffix to your yAxis ticks!
          width={yWidth}
          // domain={domain} // <--- this was once my solution for raising the maxYValue bar, but it created an issue where the gap between the last tick and one before last tick was awkward. The better solution for the initial problem is to use y padding top of 18.
          padding={{ top: 18 }}
          hide={yHide}
          tickFormatter={formatLabel}
          type='number'
          stroke='#666'
          yAxisId='left'
        />

        <Tooltip content={CustomTooltip} />

        {showLegend && <Legend />}

        {bars.map(({ name, data, unit, color, borderColor, stackId }) => {
          const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

          const barProps = {
            fill: barColorInLegend,
            stroke: borderColor,
            dataKey: name,
            stackId,
          };

          return (
            <Bar
              key={name}
              {...barProps}
              yAxisId='left'
              xAxisId='bottom'
              unit={unit}
              background={{ fill: barBackgroundColor }}
              stackId={stackId}
              // minPointSize={5} // <--- give a min height to the lowest value, so that it would still be visible.
              // barSize={40} // <--- it is best to leave this as automatically calculated
              // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead.
            >
              <LabelList dataKey={name} fontSize={11} position={stackId ? 'center' : 'top'} content={CustomizedLabel} />
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
