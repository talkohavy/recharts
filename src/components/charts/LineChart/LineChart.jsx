import { useMemo } from 'react';
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChartBase,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getNiceTickValues } from 'recharts-scale';
import { CustomizedAxisTick } from '../CustomAxisTick';
import {
  calculateLongestNiceTickWidth,
  calculateXAxisLabelPositioning,
  formatLabel,
  getHeight,
  getTextWidth,
} from '../helpers';
import ActiveDot from './ActiveDot';
import NonActiveDot from './NonActiveDot';

function formatLabel14(value) {
  return formatLabel(value, 14);
}

/**
 * @typedef {import('../types').SingleLine} SingleLine
 * @typedef {import('../types').ReferenceLine} ReferenceLine
 */

/**
 * @param {{
 *   lines: Array<SingleLine>,
 *   showGrid?: boolean | {showHorizontalLines?: boolean, showVerticalLines?: boolean},
 *   showLegend?: boolean,
 *   showZoomSlider?: boolean,
 *   gridColor?: string,
 *   xLabel?: string,
 *   xRotateAngle?: number,
 *   xTickColor?: string,
 *   xHide?: boolean,
 *   yLabel?: string,
 *   yTickColor?: string,
 *   yTickSuffix?: string,
 *   yHide?: boolean,
 *   className?: string,
 *   style?: any,
 *   referenceLines?: Array<ReferenceLine>,
 * }} props
 */
export default function LineChart(props) {
  const {
    lines,
    showGrid,
    showLegend,
    showZoomSlider,
    gridColor = '#ddd',
    xLabel,
    xRotateAngle = 0,
    xTickColor = '#666',
    xHide,
    yLabel,
    yTickColor = '#666',
    yTickSuffix = '',
    yHide,
    className,
    style,
    referenceLines,
  } = props;

  /** @type {Array<{x: number | string}>} */
  const transformedDataForRecharts = useMemo(() => {
    const transformedDataByKey = {};

    lines.forEach((currentLine) => {
      currentLine.data.forEach(({ x, y }) => {
        transformedDataByKey[x] ??= { x };
        transformedDataByKey[x][currentLine.name] = y;
      });
    });

    return Object.values(transformedDataByKey);
  }, [lines]);

  const maxYValue = useMemo(() => {
    let maxYValue = Number.NEGATIVE_INFINITY;
    lines.forEach((currentLine) => {
      currentLine.data.forEach(({ y }) => {
        if (maxYValue < y) maxYValue = y;
      });
    });

    return maxYValue;
  }, [lines]);

  const positiveXRotateAngle = Math.abs(xRotateAngle);

  const xAxisType = useMemo(() => {
    let type = null;
    let prevType = null;

    transformedDataForRecharts.forEach(({ x }) => {
      type = typeof x;

      if (prevType !== null && prevType !== type)
        throw new Error('All x values on all lines MUST be of the same type!');

      prevType = type;
    });

    return typeof type === 'string' ? 'category' : 'number';
  }, [transformedDataForRecharts]);

  const widthOfLongestYTickLabel = useMemo(() => {
    const tickCount = 5;
    const domain = [0, maxYValue];
    const allowDecimals = true;
    const niceTicks = getNiceTickValues(domain, tickCount, allowDecimals);

    const longestYTickWidth = calculateLongestNiceTickWidth(niceTicks, yTickSuffix);

    return longestYTickWidth;
  }, [maxYValue, yTickSuffix]);

  const widthOfLongestXTickLabel = useMemo(() => {
    let widthOfLongestXTickLabel = 0;

    lines.forEach(({ data }) => {
      data.forEach(({ x: currentXTickValue }) => {
        const xTickValueFormatted = formatLabel(currentXTickValue);
        const currentXTickWidth = getTextWidth({ text: xTickValueFormatted });

        if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
      });
    });

    return widthOfLongestXTickLabel;
  }, [lines]);

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXRotateAngle, maxWidth: widthOfLongestXTickLabel }),
    [positiveXRotateAngle, widthOfLongestXTickLabel],
  );

  const yLabelFixPosition = useMemo(() => {
    if (!yLabel) return undefined;
    const width = getTextWidth({ text: yLabel });

    return { value: yLabel, angle: -90, position: 'left', dy: -width / 2 };
  }, [yLabel]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase
        data={transformedDataForRecharts}
        margin={{ left: yLabel ? 12 : 0, bottom: xLabel ? 30 : 0 }}
        className={className}
        style={style}
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
          type={xAxisType} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          dataKey='x'
          textAnchor='end' // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
          stroke='#666' // <--- this is the color of the xAxis line itself!
          xAxisId='bottom'
          dy={5}
          tick={CustomizedAxisTick} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          height={xAxisHeight}
          angle={-positiveXRotateAngle}
          padding={{ right: xAxisType === 'category' ? 40 : 0 }} // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis.
          hide={xHide}
          color={xTickColor} // <--- this is the color of the tick's value!
          label={{
            value: xLabel,
            angle: 0,
            position: 'bottom',
            dy: calculateXAxisLabelPositioning({ showLegend, showZoomSlider, xRotateAngle: positiveXRotateAngle }),
            dx: -getTextWidth({ text: xLabel }) / 4,
          }}
          // unit=' cm' // <--- Doesn't appear if you're using `tick`, which you are. Also, it is good practice to have units appear on the label itself, and not on the ticks.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatLabel} // <--- only passes the string value as an argument.
        />

        <YAxis
          type='number' // <--- defaults to 'number'. 'category' or 'number'.
          stroke='#666'
          yAxisId='left'
          padding={{ top: 18 }}
          tickFormatter={formatLabel}
          hide={yHide}
          label={yLabelFixPosition}
          color={yTickColor}
          unit={yTickSuffix} // <--- you can add a unit suffix to your yAxis ticks!
          width={yLabel ? widthOfLongestYTickLabel + 18 : widthOfLongestYTickLabel + 8}
          // dataKey='y'// <--- do NOT put dataKey on y axis of LineChart! We are going to use the `name` of each Line's dataset.
        />

        <Tooltip />

        {showLegend && (
          <Legend
            layout='horizontal' // <--- how to align items of the legend.
            verticalAlign='bottom' // <--- pin legend to top, bottom or center.
            align='left' // <--- defaults to 'center'. Horizontal alignment.
            iconSize={14} // <--- defaults to 14
            onMouseEnter={() => {
              console.log('mouse enter');
            }}
            onMouseLeave={() => {
              console.log('mouse leave');
            }}
            formatter={formatLabel14}
            // iconType='circle' // <--- defaults to 'line'
          />
        )}

        {showZoomSlider && <Brush height={20} stroke='#8884d8' />}

        {referenceLines?.map(({ x, y, label, lineWidth, lineColor, isDashed }, index) => {
          const referenceLineProps = {
            x,
            y,
            label,
            stroke: lineColor ?? '#666',
            strokeWidth: lineWidth ?? 1,
            xAxisId: 'bottom',
            yAxisId: 'left',
          };

          if (isDashed) referenceLineProps.strokeDasharray = '10 10';

          return (
            <ReferenceLine
              key={index}
              {...referenceLineProps}
              // isFront // <--- defaults to false. true will display it on top of bars in BarCharts, or lines in LineCharts.
            />
          );
        })}

        {lines.map((line) => {
          const { name, color, data, lineWidth, curveType, isDashed, dots, showDotValues, hide } = line;

          const lineProps = {
            hide,
            dataKey: name,
            stroke: color ?? 'black',
            strokeWidth: lineWidth ?? 1,
            type: curveType ?? 'linear',
            r: dots?.r ?? 3, // <--- 3 is recharts default!
            // data, <--- don't put data here because if you do the line would not appear!
          };

          if (isDashed) lineProps.strokeDasharray = '20 20'; // or '5 5'

          return (
            <Line
              yAxisId='left'
              xAxisId='bottom'
              key={name}
              {...lineProps}
              dot={<NonActiveDot data={data} showDotValues={showDotValues} />}
              activeDot={<ActiveDot data={data} showDotValues={showDotValues} />}
            />
          );
        })}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
