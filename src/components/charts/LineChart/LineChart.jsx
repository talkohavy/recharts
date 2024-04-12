import { useMemo } from 'react';
import {
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
import { CustomizedAxisTick } from '../CustomAxisTick';
import { formatLabel, getHeight, getTextWidth } from '../helpers';

/**
 * @typedef {import('../types').SingleLine} SingleLine
 * @typedef {import('../types').ReferenceLine} ReferenceLine
 */

/**
 * @param {{
 *   lines: Array<SingleLine>,
 *   referenceLines?: Array<ReferenceLine>,
 *   showGrid?: boolean,
 *   showLegend?: boolean,
 *   yHide?: boolean,
 *   xAxisType?: 'number' | 'category',
 *   xRotateAngle?: number,
 *   xPadding?: {left?: number, right?: number},
 *   xHide?: boolean,
 *   xTickColor?: string,
 *   xLabel?: string,
 *   yLabel?: string,
 *   yTickColor?: string,
 *   yTickSuffix?: string,
 *   gridColor?: string,
 *   activeDotRadius?: number,
 *   activeDotColor?: string,
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function LineChart(props) {
  const {
    lines,
    referenceLines,
    showGrid,
    showLegend,
    xHide,
    xRotateAngle = 0,
    xPadding,
    xTickColor = '#666',
    xLabel,
    yLabel,
    yTickColor = '#666',
    yHide,
    yTickSuffix,
    activeDotRadius,
    activeDotColor,
    gridColor = '#ddd',
    className,
    style,
  } = props;

  const positiveXRotateAngle = Math.abs(xRotateAngle);

  const longestXTickLabel = useMemo(
    () =>
      lines.reduce(
        (maxWidth, currentLine) =>
          currentLine.data.reduce((maxWidth, { x: currentXTickValue }) => {
            const currentTickWidth = getTextWidth({
              text: formatLabel(currentXTickValue),
              fontSize: 16,
              fontFamily: 'Hiragino Sans GB',
            });
            if (maxWidth < currentTickWidth) return currentTickWidth;

            return maxWidth;
          }, maxWidth),
        0,
      ),
    [lines],
  );

  const xAxisHeight = useMemo(
    () => getHeight({ angle: -positiveXRotateAngle, maxWidth: longestXTickLabel }),
    [positiveXRotateAngle, longestXTickLabel],
  );

  const yLabelFixPosition = useMemo(() => {
    if (!yLabel) return undefined;
    const width = getTextWidth({ text: yLabel });

    return { value: yLabel, angle: -90, position: 'left', dy: -width / 2 };
  }, [yLabel]);

  const activeDot = { r: activeDotRadius ?? 8 };
  if (activeDotColor) {
    activeDot.stroke = activeDotColor;
    activeDot.fill = activeDotColor;
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase margin={{ left: yLabel ? 12 : 0, bottom: xLabel ? 20 : 0 }} className={className} style={style}>
        {/* MUST come before XAxis & YAxis */}
        {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray='5 5' />}

        <XAxis
          type='category'
          dataKey='x'
          textAnchor='end' // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
          stroke='#666' // <--- this is the color of the xAxis line itself!
          xAxisId='bottom'
          dy={5}
          tick={CustomizedAxisTick} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          height={xAxisHeight}
          angle={-positiveXRotateAngle}
          padding={xPadding} // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis.
          hide={xHide}
          color={xTickColor} // <--- this is the color of the tick's value!
          label={{ value: xLabel, angle: 0, position: 'bottom' }}
          // unit=' cm' // <--- Doesn't appear if you're using `tick`, which you are. Also, it is good practice to have units appear on the label itself, and not on the ticks.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatLabel} // <--- only passes the string value as an argument.
        />

        <YAxis
          dataKey='y'
          stroke='#666'
          yAxisId='left'
          padding={{ top: 18 }}
          tickFormatter={formatLabel}
          hide={yHide}
          label={yLabelFixPosition}
          color={yTickColor}
          unit={yTickSuffix} // <--- you can add a unit suffix to your yAxis ticks!
          // width={undefined} // <--- works differently on BarChart than it is on LineChart! On LineChart it is best left undefined.
        />

        <Tooltip />

        {showLegend && <Legend />}

        {/* <ReferenceLine x='Page C' stroke='red' label='Max PV PAGE' /> */}
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

          return <ReferenceLine key={index} {...referenceLineProps} />;
        })}

        {lines.map(({ name, color, lineWidth, curveType, data, isDashed, dot }) => {
          const lineProps = {
            data,
            stroke: color ?? 'black',
            strokeWidth: lineWidth ?? 1,
            dataKey: 'y',
            type: curveType ?? 'linear',
            activeDot,
            yAxisId: 'left',
            xAxisId: 'bottom',
            dot,
          };

          if (isDashed) lineProps.strokeDasharray = '20 20'; // or '5 5'

          return <Line key={name} {...lineProps} />;
        })}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
