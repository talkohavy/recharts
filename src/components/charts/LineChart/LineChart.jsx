import { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { BRUSH_HEIGHT, BRUSH_ITEMS_PER_PAGE, LEGEND_HEIGHT, TICK_DASH_WIDTH } from '../constants';
import { CustomizedAxisTick } from '../CustomAxisTick';
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
import ActiveDot from './ActiveDot';
import NonActiveDot from './NonActiveDot';
import '../recharts.css';

function formatLabel14(value) {
  return formatLabel(value, 14);
}

/**
 * @typedef {import('../types').LineChartProps} LineChartProps
 */

/**
 * @param {LineChartProps} props
 */
export default function LineChart(props) {
  const {
    type: xAxisType = 'category',
    lines,
    showGrid,
    showLegend,
    showZoomSlider,
    showPreviewInSlider,
    showValues: showChartValues,
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
    connectNulls,
  } = props;

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(lines), [lines]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isLineHovered, setIsLineHovered] = useState(() => getNamesObject(lines));

  const positiveXTickRotateAngle = Math.abs(xTickRotateAngle);

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

  useLayoutEffect(() => {
    validateAxisValuesAreSameType(transformedDataForRecharts);
  }, [transformedDataForRecharts]);

  useLayoutEffect(() => {
    validateUniqueNamesOnDataSets(lines);
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

  const widthOfLongestXTickLabel = useMemo(
    () => getWidthOfLongestXLabel({ transformedDataForRecharts, xAxisType }),
    [transformedDataForRecharts, xAxisType],
  );

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXTickRotateAngle, maxWidth: widthOfLongestXTickLabel }),
    [positiveXTickRotateAngle, widthOfLongestXTickLabel],
  );

  const yAxisWidth = useMemo(() => {
    const yTickCount = 5;
    const domain = [0, maxYValue];
    const allowDecimals = true;
    const niceYTicks = getNiceTickValues(domain, yTickCount, allowDecimals);

    const longestYTickWidth = calculateLongestNiceTickWidth(niceYTicks, yTickSuffix);

    const yAxisWidth = longestYTickWidth + TICK_DASH_WIDTH + (yLabel ? 8 : 0);

    return yAxisWidth;
  }, [maxYValue, yTickSuffix, yLabel]);

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
          type={xAxisType === 'datetime' ? 'number' : xAxisType} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          scale={xAxisType === 'datetime' ? 'time' : 'auto'}
          domain={['auto', 'auto']}
          allowDataOverflow={false}
          padding={{ right: 40 }} // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis. I'm using 40 to have the last dot always visible in case the last data point is a large red dot - 40 would make it visible.
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
              chartType: 'LineChart',
            }),
            dx: -yAxisWidth / 2,
          }}
          // interval={10} // <--- defaults to preserveEnd.If set 0, all the ticks will be shown. If set preserveStart", "preserveEnd" or "preserveStartEnd", the ticks which is to be shown or hidden will be calculated automatically.
          // includeHidden // <--- defaults to false. Ensures that all data points within a chart contribute to its domain calculation, even when they are hidden.
          // unit=' cm' // <--- Doesn't appear if you're using `tick`, which you are. Also, it is good practice to have units appear on the label itself, and not on the ticks of the xAxis.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatLabel} // <--- only passes the string value as an argument.
          // tickCount={10} // <-- defaults to 5
          // allowDecimals={false} // <--- default to true
          // dy={5} // <--- doesn't even work anymore.
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
          // dataKey='y'// <--- do NOT put dataKey on y axis of LineChart! We are going to use the `name` of each Line's dataset.
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
              setIsLineHovered((prevState) => {
                const newIsLineHovered = { ...prevState };
                // @ts-ignore
                newIsLineHovered[payload.dataKey] = true;
                return newIsLineHovered;
              });
            }}
            onMouseLeave={(payload) => {
              setIsLegendHovered(false);
              setIsLineHovered((prevState) => {
                const newIsLineHovered = { ...prevState };
                // @ts-ignore
                newIsLineHovered[payload.dataKey] = false;
                return newIsLineHovered;
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
              <LineChartBase data={transformedDataForRecharts}>
                {lines.map(({ name, curveType }) => (
                  <Line
                    key={name}
                    dataKey={name}
                    type={curveType}
                    isAnimationActive={false}
                    dot={false}
                    stroke='#999'
                  />
                ))}
              </LineChartBase>
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

        {lines.map((line) => {
          const { name, color, data, lineWidth, curveType, isDashed, dots, showValues: showLineValues, hide } = line;

          const lineProps = {
            hide,
            dataKey: name,
            stroke: color ?? 'black',
            strokeWidth: lineWidth ?? 1,
            type: curveType ?? 'linear',
            r: dots?.r ?? 3, // <--- 3 is recharts default!
            opacity: isLegendHovered ? (isLineHovered[name] ? 1 : 0.1) : undefined,
            isAnimationActive, // <--- rechart says it defaults to true in CSR and to false in SSR
            connectNulls,
            // data, <--- don't put data here because if you do the line would not appear!
          };

          if (isDashed) lineProps.strokeDasharray = '20 20'; // or '5 5'

          return (
            <Line
              yAxisId='left'
              xAxisId='bottom'
              key={name}
              {...lineProps}
              dot={(dotProps) => (
                <NonActiveDot
                  {...dotProps}
                  data={data}
                  showChartValues={showChartValues}
                  showLineValues={showLineValues}
                />
              )}
              activeDot={(dotProps) => (
                <ActiveDot
                  {...dotProps}
                  data={data}
                  showChartValues={showChartValues}
                  showLineValues={showLineValues}
                />
              )}
            />
          );
        })}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
