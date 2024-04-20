import { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { BRUSH_HEIGHT, BRUSH_ITEMS_PER_PAGE, LEGEND_HEIGHT } from '../constants';
import { CustomizedAxisTick } from '../CustomAxisTick';
import CustomizedLabel from '../CustomizedLabel';
import CustomTooltip from '../CustomTooltip';
import {
  calculateLongestNiceTickWidth,
  calculateXAxisLabelPositioning,
  formatLabel,
  getHeight,
  getLengthOfLongestData,
  getNamesObject,
  getTextWidth,
  getWidthOfLongestXLabel,
  validateAxisValuesAreSameType,
  validateUniqueNamesOnDataSets,
} from '../helpers';
import '../recharts.css';

const DEFAULT_BAR_COLOR = '#355cff';
const ACTIVE_BAR_COLOR = 'black'; // #82ca9d

function formatLabel14(value) {
  return formatLabel(value, 14);
}

/**
 * @typedef {import('../types').BarChartProps} BarChartProps
 * @typedef {import('../types').BarSeries} BarSeries
 * @typedef {import('../types').BarClickEventProps} BarClickEventProps
 */

/**
 * @param {BarChartProps} props
 */
export default function BarChart(props) {
  const {
    type: xAxisType = 'category',
    bars,
    showGrid,
    showLegend,
    showZoomSlider,
    showPreviewInSlider,
    showValues: showValuesGlobal,
    gridColor = '#ddd',
    xLabel,
    xTickRotateAngle = 0,
    xTickColor = '#666',
    xHide,
    yLabel,
    yTickColor = '#666',
    yTickSuffix = '',
    yHide,
    referenceLines,
    isAnimationActive,
    className,
    style,
    onClickBar,
    activeBarId,
  } = props;

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(bars), [bars]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isBarTypeHovered, setIsBarTypeHovered] = useState(() => getNamesObject(bars));

  const positiveXTickRotateAngle = Math.abs(xTickRotateAngle);

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
    validateAxisValuesAreSameType(transformedDataForRecharts);
  }, [transformedDataForRecharts]);

  useLayoutEffect(() => {
    validateUniqueNamesOnDataSets(bars);
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

  const widthOfLongestYTickLabel = useMemo(() => {
    const yTickCount = 5;
    const domain = [0, maxYValue];
    const allowDecimals = true;
    const niceYTicks = getNiceTickValues(domain, yTickCount, allowDecimals);

    const longestYTickWidth = calculateLongestNiceTickWidth(niceYTicks, yTickSuffix);

    return longestYTickWidth;
  }, [maxYValue, yTickSuffix]);

  const widthOfLongestXTickLabel = useMemo(
    () => getWidthOfLongestXLabel({ transformedDataForRecharts, xAxisType }),
    [transformedDataForRecharts, xAxisType],
  );

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXTickRotateAngle, maxWidth: widthOfLongestXTickLabel }) ?? 40,
    [positiveXTickRotateAngle, widthOfLongestXTickLabel],
  );
  const yAxisWidth = yLabel ? widthOfLongestYTickLabel + 18 : widthOfLongestYTickLabel + 8;

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
          type={xAxisType === 'category' ? 'category' : 'number'} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          scale={xAxisType === 'category' ? 'auto' : 'time'}
          domain={['auto', 'auto']}
          allowDataOverflow={false}
          padding='gap' // <--- 'gap' gives the first and the last bar gap from the walls. 'no-gap' has both the first & last bars touch the walls.
          dataKey='x'
          textAnchor='end' // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
          stroke='#666' // <--- this is the color of the xAxis line itself!
          xAxisId='bottom'
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} axisType={xAxisType} />} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          height={xAxisHeight}
          angle={-positiveXTickRotateAngle}
          hide={xHide}
          color={xTickColor} // <--- this is the color of the tick's value!
          label={{
            value: xLabel,
            angle: 0,
            position: 'bottom',
            dy: calculateXAxisLabelPositioning({
              showLegend,
              showZoomSlider,
              chartType: 'BarChart',
            }),
            dx: -yAxisWidth / 2,
          }}
          // interval={10} // <--- defaults to preserveEnd.If set 0, all the ticks will be shown. If set preserveStart", "preserveEnd" or "preserveStartEnd", the ticks which is to be shown or hidden will be calculated automatically.
          // includeHidden // <--- defaults to false. Ensures that all data points within a chart contribute to its domain calculation, even when they are hidden.
          // unit=' cm' // <--- You CANNOT use this when using `tick`, which you are. A. because it doesn't render it, and B. because some ticks will not be displayed. You can use only when using the default tick renderer, and this will automatically add a unit suffix to your xAxis ticks.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatDate} // <--- only passes the string value as an argument.
          // tickCount={10} // <-- defaults to 5
          // allowDecimals={false} // <--- default to true
          // dy={5} // <--- unlike LineChart, dy doesn't affect BarChart.
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
          width={yAxisWidth}
          // dataKey='y'// <--- do NOT put dataKey on y axis of BarChart! We are going to use the `name` of each Bars set.
        />

        <Tooltip
          content={(tooltipProps) => (
            // @ts-ignore
            <CustomTooltip {...tooltipProps} xAxisType={xAxisType} yTickSuffix={yTickSuffix} />
          )}
        />

        {showLegend && (
          <Legend
            height={LEGEND_HEIGHT}
            layout='horizontal' // <--- how to align items of the legend.
            verticalAlign='bottom' // <--- pin legend to top, bottom or center.
            align='left' // <--- defaults to 'center'. Horizontal alignment.
            iconSize={14} // <--- defaults to 14
            onMouseEnter={(payload) => {
              setIsLegendHovered(true);
              setIsBarTypeHovered((prevState) => {
                const newIsBarTypeHovered = { ...prevState };
                // @ts-ignore
                newIsBarTypeHovered[payload.dataKey] = true;
                return newIsBarTypeHovered;
              });
            }}
            onMouseLeave={(payload) => {
              setIsLegendHovered(false);
              setIsBarTypeHovered((prevState) => {
                const newIsBarTypeHovered = { ...prevState };
                // @ts-ignore
                newIsBarTypeHovered[payload.dataKey] = false;
                return newIsBarTypeHovered;
              });
            }}
            formatter={formatLabel14}
            // iconType='circle' // <--- defaults to 'line'
          />
        )}

        {showZoomSlider && (
          <Brush
            height={BRUSH_HEIGHT}
            startIndex={startIndex.current} // <--- The default start index of brush. If the option is not set, the start index will be 0.
            endIndex={endIndex.current} // <---The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
            onChange={(brushProps) => {
              startIndex.current = brushProps.startIndex;
              endIndex.current = brushProps.endIndex;
            }}
            stroke='#4b5af1'
            // gap={1} // <--- Default to 1. `gap` is the refresh rate. 1 is smoothest.
            // travellerWidth={6}
          >
            {showPreviewInSlider ? (
              <BarChartBase data={transformedDataForRecharts}>
                {bars.map(({ name }) => (
                  <Bar key={name} dataKey={name} isAnimationActive={false} fill='#999' />
                ))}
              </BarChartBase>
            ) : undefined}
          </Brush>
        )}

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
              key={name}
              yAxisId='left'
              xAxisId='bottom'
              {...barProps}
              onClick={(props, index) => onClickBar({ ...props, barTypeIndex: index, name })}
              isAnimationActive={isAnimationActive} // <--- rechart says it defaults to true in CSR and to false in SSR
              // onAnimationEnd={() => console.log('animation end!')}
              // minPointSize={5} // <--- give a min height to the lowest value, so that it would still be visible.
              // barSize={40} // <--- it is best to leave this as automatically calculated
              // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead (CustomizedLabel).
              // background={{ fill: barBackgroundOverlayColor }} // <--- DO NOT put a background! This is what interrupted my onClick event from getting the right BarChart name!
            >
              {showValuesGlobal && (
                <LabelList
                  dataKey={name}
                  fontSize={11}
                  position={stackId ? 'center' : 'top'}
                  content={CustomizedLabel}
                />
              )}

              {data.map(({ x, color: specificColor }) => {
                const barId = `${name}-${x}`;

                return (
                  <Cell
                    key={barId}
                    fill={barId === activeBarId ? ACTIVE_BAR_COLOR : specificColor ?? color ?? DEFAULT_BAR_COLOR}
                    opacity={isLegendHovered ? (isBarTypeHovered[name] ? 1 : 0.2) : undefined}
                    cursor={onClickBar && 'pointer'}
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
