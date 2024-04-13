import { useMemo } from 'react';
import {
  Bar,
  BarChart as BarChartBase,
  Brush,
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
import { formatLabel, getHeight, getTextWidth } from '../helpers';

const DEFAULT_BAR_COLOR = '#355cff';

/**
 * @typedef {import('../types').SingleBar} SingleBar
 * @typedef {import('../types').BarClickEventProps} BarClickEventProps
 */

/**
 * @param {{
 *   bars: Array<SingleBar>,
 *   xLabel?: string,
 *   yLabel?: string,
 *   showGrid?: boolean | {showHorizontalLines?: boolean, showVerticalLines?: boolean},
 *   showLegend?: boolean,
 *   showZoomSlider?: boolean,
 *   xRotateAngle?: number,
 *   xPadding?: {left?: number, right?: number},
 *   xHide?: boolean,
 *   xTickColor?: string,
 *   yHide?: boolean,
 *   yTickSuffix?: string,
 *   yTickColor?: string,
 *   barBackgroundColor?: string,
 *   gridColor?: string,
 *   onClickBar?: (props: BarClickEventProps, index: number) => void,
 *   activeIndex?: number,
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function BarChart(props) {
  const {
    bars,
    showGrid,
    showLegend,
    showZoomSlider,
    xRotateAngle = 0,
    xPadding,
    xHide,
    xTickColor = '#666',
    xLabel,
    yLabel,
    yHide,
    yTickColor = '#666',
    yTickSuffix,
    barBackgroundColor = 'transparent',
    gridColor = '#ddd',
    onClickBar,
    activeIndex,
    className,
    style,
  } = props;

  const positiveXRotateAngle = Math.abs(xRotateAngle);

  const { widthOfLongestXTickLabel, widthOfLongestYTickLabel } = useMemo(() => {
    let widthOfLongestXTickLabel = 0;
    let widthOfLongestYTickLabel = 0;

    bars.forEach(({ data }) => {
      data.forEach(({ x: currentXTickValue, y: currentYTickValue }) => {
        const currentXTickWidth = getTextWidth({ text: formatLabel(currentXTickValue) });

        widthOfLongestXTickLabel =
          widthOfLongestXTickLabel < currentXTickWidth ? currentXTickWidth : widthOfLongestXTickLabel;

        const currentYTickWidth = getTextWidth({ text: formatLabel(currentYTickValue) });

        widthOfLongestYTickLabel =
          widthOfLongestYTickLabel < currentYTickWidth ? currentYTickWidth : widthOfLongestYTickLabel;
      });
    });

    return { widthOfLongestXTickLabel, widthOfLongestYTickLabel };
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
          dy={0}
          tick={CustomizedAxisTick} // <--- passes everything as an argument! x, y, width, height, everything! You'll even need to handle the tick's positioning, and format the entire tick.
          height={xAxisHeight}
          angle={-positiveXRotateAngle}
          padding={xPadding} // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis.
          hide={xHide}
          color={xTickColor} // <--- this is the color of the tick's value!
          label={{
            value: xLabel,
            angle: 0,
            position: 'bottom',
            dy: showLegend ? 20 : 0,
            dx: -getTextWidth({ text: xLabel }) / 2,
          }}
          // unit=' cm' // <--- You CANNOT use this when using `tick`, which you are. A. because it doesn't render it, and B. because some ticks will not be displayed. You can use only when using the default tick renderer, and this will automatically add a unit suffix to your xAxis ticks.
          // fontSize={22}
          // fontWeight={100}
          // tickFormatter={formatLabel} // <--- only passes the string value as an argument.
        />

        <YAxis
          // dataKey='y'// <--- do NOT put dataKey on y axis of BarChart! We are going to use the `name` of each Bars set.
          type='number' // <--- defaults to 'number'. 'category' or 'number'.
          stroke='#666'
          yAxisId='left'
          padding={{ top: 18 }}
          tickFormatter={formatLabel}
          width={yLabel ? widthOfLongestYTickLabel + 25 : widthOfLongestYTickLabel + 20} // <--- works differently on BarChart than it is on LineChart! On LineChart it is best left undefined.
          hide={yHide}
          label={yLabelFixPosition}
          color={yTickColor}
          unit={yTickSuffix} // <--- you can add a unit suffix to your yAxis ticks!
        />

        <Tooltip content={CustomTooltip} />

        {showLegend && <Legend />}

        {showZoomSlider && <Brush height={20} stroke='#8884d8' />}

        {bars.map(({ name, data, unit, color, borderColor, stackId }) => {
          const barColorInLegend = color ?? DEFAULT_BAR_COLOR;

          const barProps = {
            fill: barColorInLegend,
            stroke: borderColor,
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
              background={{ fill: barBackgroundColor }}
              onClick={onClickBar}
              // minPointSize={5} // <--- give a min height to the lowest value, so that it would still be visible.
              // barSize={40} // <--- it is best to leave this as automatically calculated
              // label={{ position: 'top' }} // <--- Don't need! I'm using a custom label renderer instead.
            >
              <LabelList dataKey={name} fontSize={11} position={stackId ? 'center' : 'top'} content={CustomizedLabel} />
              {data.map(({ color: specificColor }, cellIndex) => (
                <Cell
                  cursor={onClickBar && 'pointer'}
                  key={`cell-${name}-${cellIndex}`}
                  fill={cellIndex === activeIndex ? '#82ca9d' : specificColor ?? color ?? DEFAULT_BAR_COLOR}
                />
              ))}
            </Bar>
          );
        })}
      </BarChartBase>
    </ResponsiveContainer>
  );
}
