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
import { BRUSH_HEIGHT, BRUSH_ITEMS_PER_PAGE, LEGEND_HEIGHT } from '../constants';
import { CustomizedAxisTick } from '../CustomAxisTick';
import CustomTooltip from '../CustomTooltip';
import {
  calculateYAxisWidth,
  getHeight,
  getLengthOfLongestData,
  getMergedChartSettings,
  getNamesObject,
  getWidthOfLongestXLabel,
  validateAxisValuesAreSameType,
  validateUniqueNamesOnDataSets,
} from '../helpers';
import ActiveDot from './ActiveDot';
import NonActiveDot from './NonActiveDot';
import '../recharts.css';

/**
 * @typedef {import('../types').LineChartProps} LineChartProps
 */

/**
 * @param {LineChartProps} props
 */
export default function LineChart(props) {
  const { type: xAxisType = 'category', settings: settingsToMerge, lines, referenceLines, className, style } = props;

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(lines), [lines]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isLineHovered, setIsLineHovered] = useState(() => getNamesObject(lines));

  const positiveXTickRotateAngle = Math.abs(settingsToMerge?.xAxis?.tickAngle ?? 0);

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

  const yAxisWidth = useMemo(
    () =>
      calculateYAxisWidth({
        maxYValue,
        yLabel: settingsToMerge?.yAxis?.label,
        yTickSuffix: settingsToMerge?.yAxis?.tickSuffix,
      }),
    [maxYValue, settingsToMerge?.yAxis?.label, settingsToMerge?.yAxis?.tickSuffix],
  );

  const chartSettings = useMemo(
    () => getMergedChartSettings({ chartType: 'LineChart', settings: settingsToMerge, xAxisHeight, yAxisWidth }),
    [settingsToMerge, xAxisHeight, yAxisWidth],
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase
        data={transformedDataForRecharts}
        className={className}
        style={style}
        {...chartSettings.lineChartBase}
      >
        {/* MUST come before XAxis & YAxis */}
        {chartSettings.grid.show && <CartesianGrid {...chartSettings.grid} />}

        <XAxis
          {...chartSettings.xAxis}
          type={xAxisType === 'datetime' ? 'number' : xAxisType} // <--- 'category' v.s. 'number'. What is the difference? Isn't it the same eventually? Well no, because consider a case where gaps exist. For instance, 0 1 2 4 5. A 'category' would place an even distance between 2 & 4, when in fact it's a double gap!
          scale={xAxisType === 'datetime' ? 'time' : 'auto'}
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} axisType={xAxisType} />} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
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

        {/* @ts-ignore */}
        <YAxis
          {...chartSettings.yAxis}
          // dataKey='y'// <--- do NOT put dataKey on y axis of LineChart! We are going to use the `name` of each Line's dataset.
        />

        <Tooltip
          content={(tooltipProps) => (
            // @ts-ignore
            <CustomTooltip {...tooltipProps} xAxisType={xAxisType} yTickSuffix={chartSettings.tooltip.yTickSuffix} />
          )}
        />

        {chartSettings.legend.show && (
          // @ts-ignore
          <Legend
            {...chartSettings.legend}
            height={LEGEND_HEIGHT}
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
            // iconType='circle' // <--- defaults to 'line'
          />
        )}

        {chartSettings.zoomSlider.show && (
          <Brush
            height={BRUSH_HEIGHT}
            startIndex={startIndex.current} // <--- The default start index of brush. If the option is not set, the start index will be 0.
            endIndex={endIndex.current} // <---The default end index of brush. If the option is not set, the end index will be calculated by the length of data.
            onChange={(brushProps) => {
              startIndex.current = brushProps.startIndex;
              endIndex.current = brushProps.endIndex;
            }}
            {...chartSettings.zoomSlider}
            // gap={1} // <--- Default to 1. `gap` is the refresh rate. 1 is smoothest.
            // travellerWidth={6}
          >
            {chartSettings.zoomSlider.showPreviewInSlider ? (
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
            // data, <--- don't put data here because if you do the line would not appear!
          };

          if (isDashed) lineProps.strokeDasharray = '20 20'; // or '5 5'

          return (
            <Line
              key={name}
              {...chartSettings.lines}
              {...lineProps}
              dot={(dotProps) => (
                <NonActiveDot
                  {...dotProps}
                  data={data}
                  showChartValues={chartSettings.general.showValues}
                  showLineValues={showLineValues}
                />
              )}
              activeDot={(dotProps) => (
                <ActiveDot
                  {...dotProps}
                  data={data}
                  showChartValues={chartSettings.general.showValues}
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
