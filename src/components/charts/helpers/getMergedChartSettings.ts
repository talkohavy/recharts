import { BRUSH_HEIGHT, LEGEND_HEIGHT } from '../constants';
import { calculateXAxisLabelPositioning } from './calculateXAxisLabelPositioning';
import { FORMATTERS, formatLabel } from './formatters';
import { getTextWidth } from './getTextWidth';

/**
 * @typedef {import('../types').ChartSettings} ChartSettings
 */
// * @returns {ChartSettings}

/**
 * @param {{
 *   chartType: 'LineChart' | 'BarChart',
 *   settings: ChartSettings,
 *   xAxisHeight: number,
 *   yAxisWidth: number,
 *   xAxisType: 'category' | 'number' | 'datetime'
 * }} props
 */
function getMergedChartSettings({ chartType, settings, xAxisHeight, yAxisWidth, xAxisType }) {
  const showGrid = settings?.grid?.show ?? true;
  const showLegend = settings?.legend?.show ?? chartType === 'BarChart';

  return {
    general: {
      showValues: settings?.general?.showValues,
    },
    xAxis: {
      props: {
        hide: settings?.xAxis?.show === undefined ? false : !settings?.xAxis?.show,
        color: settings?.xAxis?.color ?? 'black', // <--- this is the color of the tick's value!
        label: {
          value: settings?.xAxis?.label,
          angle: 0,
          position: 'bottom',
          dy: calculateXAxisLabelPositioning({
            showLegend,
            showZoomSlider: settings?.zoomSlider?.show ?? false,
            chartType,
          }),
          dx: -yAxisWidth / 2,
        },
        domain: ['auto', 'auto'],
        allowDataOverflow: false,
        dataKey: 'x',
        angle: settings?.xAxis?.tickAngle ? -Math.abs(settings?.xAxis?.tickAngle) : 0,
        height: xAxisHeight,
        textAnchor: 'end', // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
        stroke: '#666', // <--- this is the color of the xAxis line itself!
        xAxisId: 'bottom',
        padding: { right: 40 }, // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis. I'm using 40 to have the last dot always visible in case the last data point is a large red dot - 40 would make it visible.
        tickFormatter: settings?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType], // <--- only passes the string value as an argument.
        // tickSize: 6, // <--- defaults to 6. The length of tick line.
        // tickCount: 5, // <-- defaults to 5
        // interval: 0, // <--- defaults to "preserveEnd". If set 0, all the ticks will be shown. If set "preserveStart", "preserveEnd" or "preserveStartEnd", the ticks which is to be shown or hidden will be calculated automatically.
        // includeHidden: true, // <--- defaults to false. Ensures that all data points within a chart contribute to its domain calculation, even when they are hidden.
        // allowDecimals: false, // <--- default to true
        // unit: 'cm', // <--- Doesn't appear if you're using `tick`, which you are. Also, it is good practice to have units appear on the label itself, and not on the ticks of the xAxis.
        // fontSize: 22,
        // fontWeight: 100,
        // dy: 5, // <--- doesn't even work anymore.
      },
    },
    yAxis: {
      props: {
        hide: settings?.yAxis?.show === undefined ? false : !settings?.yAxis?.show,
        color: settings?.yAxis?.tickColor ?? '#666',
        unit: settings?.yAxis?.tickSuffix ?? '',
        width: yAxisWidth,
        label: settings?.yAxis?.label
          ? {
              value: settings.yAxis.label,
              angle: -90,
              position: 'left',
              dy: -getTextWidth({ text: settings.yAxis.label }) / 2,
            }
          : undefined,
        tickFormatter: settings?.yAxis?.tickFormatter ?? formatLabel,
        type: 'number', // <--- defaults to 'number'. 'category' or 'number'.
        stroke: '#666',
        yAxisId: 'left',
        padding: { top: 18 },
        includeHidden: true, // <--- when having multiple lines, and playing around clicking the legend items, animations look so much better with this as `true`.
        // dataKey: 'y'// <--- do NOT put dataKey on y axis of BarChart or LineChart! We are going to use the `name` of each Bars set.
      },
    },
    grid: {
      show: !!showGrid,
      props: {
        stroke: settings?.grid?.color ?? '#ddd',
        // @ts-ignore
        horizontal: !!(showGrid === true || showGrid?.showHorizontalLines),
        // @ts-ignore
        vertical: !!(showGrid === true || showGrid?.showVerticalLines),
        strokeDasharray: settings?.grid?.strokeDasharray ?? '5 5',
        syncWithTicks: true,
      },
    },
    legend: {
      show: settings?.legend?.show ?? false,
      props: {
        layout: 'horizontal', // <--- how to align items of the legend.
        verticalAlign: 'bottom', // <--- pin legend to top, bottom or center.
        align: 'left', // <--- defaults to 'center'. Horizontal alignment.
        iconSize: 14, // <--- defaults to 14
        formatter: settings?.legend?.nameFormatter ?? ((value) => formatLabel(value, 14)),
        height: LEGEND_HEIGHT,
        // iconType: 'circle' // <--- defaults to 'line'
      },
    },
    tooltip: {
      yTickSuffix: settings?.yAxis?.tickSuffix ?? '', // <--- Notice that I copy whatever the yAxis has.
      xValueFormatter: settings?.xAxis?.tickFormatter ?? settings?.tooltip?.xValueFormatter ?? FORMATTERS[xAxisType],
    },
    zoomSlider: {
      show: settings?.zoomSlider?.show,
      showPreviewInSlider: settings?.zoomSlider?.showPreviewInSlider,
      props: {
        stroke: '#4b5af1',
        height: BRUSH_HEIGHT,
        // gap: 1 // <--- Default to 1. `gap` is the refresh rate. 1 is smoothest.
        // travellerWidth: 6
      },
    },
    lines: {
      props: {
        isAnimationActive: settings?.general?.isAnimationActive, // <--- rechart says it defaults to true in CSR and to false in SSR
        connectNulls: settings?.lines?.connectNulls,
        xAxisId: 'bottom',
        yAxisId: 'left',
      },
    },
    bars: {
      props: {
        xAxisId: 'bottom',
        yAxisId: 'left',
        // minPointSize: 5, // <--- give a min height to the lowest value, so that it would still be visible.
        // barSize: 40, // <--- it is best to leave this as automatically calculated
        // background: { fill: barBackgroundOverlayColor } // <--- DO NOT put a background! This is what interrupted my onClick event from getting the right BarChart name!
      },
    },
    referenceLines: {
      props: {
        xAxisId: 'bottom',
        yAxisId: 'left',
      },
    },
    lineChartBase: {
      props: {
        margin: {
          left: settings?.yAxis?.label ? 12 : 0,
          bottom: settings?.xAxis?.label ? 30 : 0,
        },
      },
    },
    barChartBase: {
      props: {
        margin: {
          left: settings?.yAxis?.label ? 12 : 0,
          bottom: settings?.xAxis?.label ? 20 : 0,
        },
        stackOffset: 'sign', // <--- sign knows how to deal with negative values, while default stackOffset just hides them (doesn't show them).
      },
    },
  };
}

export { getMergedChartSettings };
