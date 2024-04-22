import { useMemo, useRef, useState } from 'react';
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
import { BRUSH_ITEMS_PER_PAGE } from '../constants';
import { CustomizedAxisTick } from '../CustomAxisTick';
import CustomizedLabel from '../CustomizedLabel';
import CustomTooltip from '../CustomTooltip';
import {
  FORMATTERS,
  calculateYAxisWidth,
  getHeight,
  getLengthOfLongestData,
  getMergedChartSettings,
  getNamesObject,
  getTextWidth,
  getWidthOfLongestXLabel,
  runValidationsOnAllSeries,
} from '../helpers';
import '../recharts.css';

const DEFAULT_BAR_COLOR = '#355cff';
const ACTIVE_BAR_COLOR = 'black'; // #82ca9d

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
    settings: settingsToMerge,
    bars,
    referenceLines,
    className,
    style,
    onClickBar,
    activeBarId,
  } = props;

  useMemo(() => runValidationsOnAllSeries(bars), [bars]);

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(bars), [bars]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isBarTypeHovered, setIsBarTypeHovered] = useState(() => getNamesObject(bars));

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

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

  const maxYValue = useMemo(() => {
    let maxYValue = Number.NEGATIVE_INFINITY;
    bars.forEach((currentBarType) => {
      currentBarType.data.forEach(({ y }) => {
        if (maxYValue < y) maxYValue = y;
      });
    });

    return maxYValue;
  }, [bars]);

  const widthOfLongestXTickLabel = useMemo(
    () =>
      getWidthOfLongestXLabel({
        transformedDataForRecharts,
        xTickFormatter: settingsToMerge?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType],
      }),
    [transformedDataForRecharts, xAxisType, settingsToMerge?.xAxis?.tickFormatter],
  );

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXTickRotateAngle, maxWidth: widthOfLongestXTickLabel }) ?? 40,
    [positiveXTickRotateAngle, widthOfLongestXTickLabel],
  );

  const yAxisWidth = useMemo(() => {
    const yAxisWidth = calculateYAxisWidth({
      maxYValue,
      yLabel: settingsToMerge?.yAxis?.label,
      yTickSuffix: settingsToMerge?.yAxis?.tickSuffix,
    });

    let widthOfLongestFirstXTickLabel = 0;
    bars.forEach((currentLine) => {
      if (!currentLine.data.length) return;

      const firstDataPointsXLength = getTextWidth({ text: currentLine.data[0].x.toString() });
      if (widthOfLongestFirstXTickLabel < firstDataPointsXLength) {
        widthOfLongestFirstXTickLabel = firstDataPointsXLength;
      }
    });

    return yAxisWidth;

    // const maxFirstHorizontalWidth = getWidth({
    //   angle: -positiveXTickRotateAngle,
    //   maxWidth: widthOfLongestFirstXTickLabel,
    // });

    // return Math.max(yAxisWidth, maxFirstHorizontalWidth);
  }, [bars, maxYValue, settingsToMerge?.yAxis?.label, settingsToMerge?.yAxis?.tickSuffix]);

  const chartSettings = useMemo(
    () =>
      getMergedChartSettings({ settings: settingsToMerge, chartType: 'LineChart', xAxisType, xAxisHeight, yAxisWidth }),
    [settingsToMerge, xAxisType, xAxisHeight, yAxisWidth],
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      {/* @ts-ignore */}
      <BarChartBase
        data={transformedDataForRecharts}
        className={className}
        style={style}
        {...chartSettings.barChartBase}
        // layout='horizontal' // <--- default is 'horizontal'
        // reverseStackOrder // <--- default is false. When true, stacked items will be rendered right to left. By default, stacked items are rendered left to right. Render direction affects SVG layering, not x position.
        // barCategoryGap='10%' // <--- gap between bars. Hard to make this generic. The default seems to do a pretty good job.
      >
        {/* MUST come before XAxis & YAxis */}
        {chartSettings.grid.show && <CartesianGrid {...chartSettings.grid} />}

        <XAxis
          {...chartSettings.xAxis}
          padding='gap' // <--- 'gap' is unique to BarChart. 'gap' gives the first and the last bar gap from the walls. 'no-gap' has both the first & last bars touch the walls.
          type={xAxisType === 'category' ? 'category' : 'number'} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          scale={xAxisType === 'category' ? 'auto' : 'time'}
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} xTickFormatter={chartSettings.xAxis.tickFormatter} />} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
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

        {/* @ts-ignore */}
        <YAxis {...chartSettings.yAxis} />

        <Tooltip
          content={(tooltipProps) => (
            // @ts-ignore
            <CustomTooltip
              {...tooltipProps}
              xValueFormatter={chartSettings.tooltip.xValueFormatter}
              ySuffix={chartSettings.tooltip.yTickSuffix}
            />
          )}
        />

        {chartSettings.legend.show && (
          // @ts-ignore
          <Legend
            {...chartSettings.legend}
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
          />
        )}

        {chartSettings.zoomSlider.show && (
          <Brush
            {...chartSettings.zoomSlider}
            startIndex={startIndex.current} // <--- The default start index of brush. If the option is not set, the start index will be 0.
            endIndex={endIndex.current} // <---The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
            onChange={(brushProps) => {
              startIndex.current = brushProps.startIndex;
              endIndex.current = brushProps.endIndex;
            }}
          >
            {chartSettings.zoomSlider.showPreviewInSlider ? (
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
          };

          if (isDashed) referenceLineProps.strokeDasharray = '10 10';

          return (
            <ReferenceLine
              key={index}
              {...chartSettings.referenceLines}
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
              {...chartSettings.bars}
              {...barProps}
              onClick={(props, index) => onClickBar({ ...props, barTypeIndex: index, name })}
              // onAnimationEnd={() => console.log('animation end!')}
              // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead (CustomizedLabel).
            >
              {chartSettings.general.showValues && (
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
