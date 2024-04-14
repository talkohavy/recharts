import { useLayoutEffect, useMemo } from 'react';
import {
  Bar,
  BarChart as BarChartBase,
  Brush,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getNiceTickValues } from 'recharts-scale';
import { CustomizedAxisTick } from '../CustomAxisTick';
import CustomizedLabel from '../CustomizedLabel';
import CustomTooltip from '../CustomTooltip';
import {
  calculateLongestNiceTickWidth,
  calculateXAxisLabelPositioning,
  formatLabel,
  getHeight,
  getTextWidth,
} from '../helpers';

const DEFAULT_BAR_COLOR = '#355cff';
const ACTIVE_BAR_COLOR = 'black'; // #82ca9d

function formatLabel14(value) {
  return formatLabel(value, 14);
}

/**
 * @typedef {import('../types').BarChartProps} BarChartProps
 * @typedef {import('../types').SingleBar} SingleBar
 * @typedef {import('../types').BarClickEventProps} BarClickEventProps
 */

/**
 * @param {BarChartProps} props
 */
export default function BarChart(props) {
  const {
    bars,
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
    yTickSuffix,
    yHide,
    referenceLines,
    className,
    style,
    barBackgroundOverlayColor = 'transparent',
    onClickBar,
    activeBarId,
  } = props;

  /** @type {Array<{x: number | string}>} */
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

  useLayoutEffect(() => {
    for (let i = 0; i < bars.length - 1; i++) {
      for (let j = i + 1; j < bars.length; j++) {
        if (bars[i].name === bars[j].name) throw new Error('Two bars cannot have the same name!');
      }
    }
  }, [bars]);

  const maxYValue = useMemo(() => {
    let maxYValue = Number.NEGATIVE_INFINITY;
    bars.forEach((currentBarType) => {
      currentBarType.data.forEach(({ y }) => {
        if (maxYValue < y) maxYValue = y;
      });
    });

    return maxYValue;
  }, [bars]);

  const positiveXRotateAngle = Math.abs(xRotateAngle);

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

    bars.forEach(({ data }) => {
      data.forEach(({ x: currentXTickValue }) => {
        const currentXTickWidth = getTextWidth({ text: formatLabel(currentXTickValue) });

        if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
      });
    });

    return widthOfLongestXTickLabel;
  }, [bars]);

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXRotateAngle, maxWidth: widthOfLongestXTickLabel }) ?? 40,
    [positiveXRotateAngle, widthOfLongestXTickLabel],
  );

  const yLabelFixPosition = useMemo(() => {
    if (!yLabel) return undefined;
    const width = getTextWidth({ text: yLabel });

    return { value: yLabel, angle: -90, position: 'left', dy: -width / 2 };
  }, [yLabel]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChartBase
        data={transformedDataForRecharts}
        margin={{ left: yLabel ? 12 : 0, bottom: xLabel ? 20 : 0 }}
        stackOffset='sign' // <--- sign knows how to deal with negative values, while default stackOffset just hides them (doesn't show them).
        className={className}
        style={style}
        // layout='horizontal' // <--- default is 'horizontal'
        // reverseStackOrder // <--- default is false. When true, stacked items will be rendered right to left. By default, stacked items are rendered left to right. Render direction affects SVG layering, not x position.
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
          textAnchor='end' // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
          stroke='#666' // <--- this is the color of the xAxis line itself!
          xAxisId='bottom'
          tick={CustomizedAxisTick} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          height={xAxisHeight}
          angle={-positiveXRotateAngle}
          hide={xHide}
          color={xTickColor} // <--- this is the color of the tick's value!
          label={{
            value: xLabel,
            angle: 0,
            position: 'bottom',
            dy: calculateXAxisLabelPositioning({
              showLegend,
              showZoomSlider,
              xRotateAngle: positiveXRotateAngle,
              chartType: 'BarChart',
            }),
            dx: -getTextWidth({ text: xLabel }) / 2,
          }}
          // unit=' cm' // <--- You CANNOT use this when using `tick`, which you are. A. because it doesn't render it, and B. because some ticks will not be displayed. You can use only when using the default tick renderer, and this will automatically add a unit suffix to your xAxis ticks.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatLabel} // <--- only passes the string value as an argument.
          // dy={5} // <--- unlike LineChart, dy doesn't affect BarChart.
          // padding={xPadding} // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis.
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
          // dataKey='y'// <--- do NOT put dataKey on y axis of BarChart! We are going to use the `name` of each Bars set.
        />

        <Tooltip content={CustomTooltip} />

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

        {bars.map(({ name, data, unit, color, barBorderColor, stackId }) => {
          const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

          const barProps = {
            fill: barColorInLegend,
            stroke: barBorderColor,
            dataKey: name,
            stackId,
            unit,
          };

          return (
            <Bar
              yAxisId='left'
              xAxisId='bottom'
              key={name}
              {...barProps}
              background={{ fill: barBackgroundOverlayColor }}
              onClick={(props, index) => onClickBar({ ...props, barTypeIndex: index, name })}
              data-test-id={name}
              // minPointSize={5} // <--- give a min height to the lowest value, so that it would still be visible.
              // barSize={40} // <--- it is best to leave this as automatically calculated
              // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead.
            >
              <LabelList dataKey={name} fontSize={11} position={stackId ? 'center' : 'top'} content={CustomizedLabel} />
              {data.map(({ x, color: specificColor }) => {
                const barId = `${name}-${x}`;

                return (
                  <Cell
                    cursor={onClickBar && 'pointer'}
                    key={barId}
                    fill={barId === activeBarId ? ACTIVE_BAR_COLOR : specificColor ?? color ?? DEFAULT_BAR_COLOR}
                  />
                );
              })}
            </Bar>
          );
        })}
      </BarChartBase>
    </ResponsiveContainer>
  );
}
