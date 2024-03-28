import { useMemo } from 'react';
import {
  Bar,
  BarChart as BarChartBase,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
 *   xHeight?: number,
 *   xPadding?: {left?: number, right?: number},
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
    xHeight,
    xPadding,
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

    const maxYValue = bars.reduce((maxValue, currentBarType) => {
      const maxValueInCurrentData = currentBarType.data.reduce(
        (maxValue, { y: currentY }) => (currentY > maxValue ? currentY : maxValue),
        maxValue,
      );
      return maxValueInCurrentData > maxValue ? maxValueInCurrentData : maxValue;
    }, Number.NEGATIVE_INFINITY);

    const increaseBy = unit === 'absolute' ? amount : Math.ceil((maxYValue * amount) / 100);
    /** @type {import('../types').AxisDomain} */
    const domain = [0, `dataMax + ${increaseBy}`];

    return domain;
  }, [bars, gapFromTop]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChartBase data={transformedDataForRecharts} margin={margin} className={className} style={style}>
        {/* MUST come before XAxis & YAxis */}
        {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray='5 5' />}

        <XAxis
          type='category'
          dataKey='x'
          height={xHeight}
          angle={xRotateAngle}
          dy={xDown}
          padding={xPadding}
          stroke='#666'
          xAxisId='bottom'
        />
        <YAxis stroke='#666' yAxisId='left' domain={domain} />

        <Tooltip />

        {showLegend && <Legend />}

        {bars.map(({ name, data, color, borderColor }) => {
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
              label={{ position: 'top' }}
              yAxisId='left'
              xAxisId='bottom'
              background={{ fill: barBackgroundColor }}
            >
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
