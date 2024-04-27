import { useMemo, useRef, useState } from 'react';
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
import { BRUSH_ITEMS_PER_PAGE, DASHED_LINE } from '../constants';
import { CustomizedAxisTick } from '../CustomAxisTick';
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

  useMemo(() => runValidationsOnAllSeries(lines), [lines]);

  const lengthOfLongestData = useMemo(() => getLengthOfLongestData(lines), [lines]);

  const startIndex = useRef(0);
  const endIndex = useRef(Math.min(BRUSH_ITEMS_PER_PAGE, lengthOfLongestData - 1));
  const [isLegendHovered, setIsLegendHovered] = useState(false);
  const [isLineHovered, setIsLineHovered] = useState(() => getNamesObject(lines));
  const [visibleLines, setVisibleLines] = useState(() => getNamesObject(lines, true));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, settingsToMerge?.zoomSlider?.show]);

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
    () =>
      getWidthOfLongestXLabel({
        transformedDataForRecharts,
        xTickFormatter: settingsToMerge?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType],
      }),
    [transformedDataForRecharts, xAxisType, settingsToMerge?.xAxis?.tickFormatter],
  );

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXTickRotateAngle, maxWidth: widthOfLongestXTickLabel }),
    [positiveXTickRotateAngle, widthOfLongestXTickLabel],
  );

  const yAxisWidth = useMemo(() => {
    const yAxisWidth = calculateYAxisWidth({
      maxYValue,
      yLabel: settingsToMerge?.yAxis?.label,
      yTickSuffix: settingsToMerge?.yAxis?.tickSuffix,
    });

    let widthOfLongestFirstXTickLabel = 0;
    lines.forEach((currentLine) => {
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
  }, [lines, maxYValue, settingsToMerge?.yAxis?.label, settingsToMerge?.yAxis?.tickSuffix]);

  const chartSettings = useMemo(
    () =>
      getMergedChartSettings({ settings: settingsToMerge, chartType: 'LineChart', xAxisType, xAxisHeight, yAxisWidth }),
    [settingsToMerge, xAxisType, xAxisHeight, yAxisWidth],
  );

  return (
    // minHeight={300}
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
          tick={(tickProps) => <CustomizedAxisTick {...tickProps} xTickFormatter={chartSettings.xAxis.tickFormatter} />} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
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
              const lineName = payload.dataKey;

              if (!visibleLines[lineName]) return;

              setIsLegendHovered(true);
              // @ts-ignore
              setIsLineHovered((prevState) => ({ ...prevState, [lineName]: true }));
            }}
            onMouseLeave={(payload) => {
              const lineName = payload.dataKey;

              if (!visibleLines[lineName]) return;

              setIsLegendHovered(false);

              // @ts-ignore
              setIsLineHovered((prevState) => ({ ...prevState, [lineName]: false }));
            }}
            onClick={(payload) => {
              const lineName = payload.dataKey;

              if (visibleLines[lineName]) setIsLegendHovered(false);

              // @ts-ignore
              setVisibleLines((prevState) => ({ ...prevState, [lineName]: !prevState[lineName] }));
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
              <LineChartBase data={transformedDataForRecharts}>
                {lines.map(({ name, curveType, isDashed }) => (
                  <Line
                    key={name}
                    dataKey={name}
                    type={curveType}
                    isAnimationActive={false}
                    dot={false}
                    strokeDasharray={isDashed ? DASHED_LINE : undefined}
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

          if (isDashed) lineProps.strokeDasharray = DASHED_LINE;

          return (
            <Line
              key={name}
              {...chartSettings.lines}
              {...lineProps}
              hide={!visibleLines[name]}
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
