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
  return {
    general: {
      showValues: settings?.general?.showValues,
    },
    xAxis: {
      hide: settings?.xAxis?.show === undefined ? false : !settings?.xAxis?.show,
      color: settings?.xAxis?.color ?? 'black', // <--- this is the color of the tick's value!
      label: {
        value: settings?.xAxis?.label,
        angle: 0,
        position: 'bottom',
        dy: calculateXAxisLabelPositioning({
          showLegend: settings?.legend?.show ?? true,
          showZoomSlider: settings?.legend?.show ?? false, // <--- this line is coupled with the line of `legend.show`. When it changed, this line should also change.
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
      tickFormatter: settings?.xAxis?.tickFormatter ?? FORMATTERS[xAxisType],
    },
    yAxis: {
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
    },
    grid: {
      show: settings?.grid?.show,
      stroke: settings?.grid?.color ?? '#ddd',
      horizontal: !!(settings?.grid?.show === true || settings?.grid?.showHorizontalLines),
      vertical: !!(settings?.grid?.show === true || settings?.grid?.showVerticalLines),
      strokeDasharray: settings?.grid?.strokeDasharray ?? '5 5',
      syncWithTicks: true,
    },
    legend: {
      show: settings?.legend?.show ?? false,
      layout: 'horizontal', // <--- how to align items of the legend.
      verticalAlign: 'bottom', // <--- pin legend to top, bottom or center.
      align: 'left', // <--- defaults to 'center'. Horizontal alignment.
      iconSize: 14, // <--- defaults to 14
      formatter: settings?.legend?.nameFormatter ?? ((value) => formatLabel(value, 14)),
    },
    tooltip: {
      yTickSuffix: settings?.yAxis?.tickSuffix ?? '', // <--- Notice that I copy whatever the yAxis has.
      xValueFormatter: settings?.xAxis?.tickFormatter ?? settings?.tooltip.xValueFormatter ?? FORMATTERS[xAxisType],
    },
    zoomSlider: {
      show: settings?.zoomSlider?.show,
      showPreviewInSlider: settings?.zoomSlider?.showPreviewInSlider,
      stroke: '#4b5af1',
    },
    lines: {
      isAnimationActive: settings?.general?.isAnimationActive, // <--- rechart says it defaults to true in CSR and to false in SSR
      connectNulls: settings?.lines?.connectNulls,
      xAxisId: 'bottom',
      yAxisId: 'left',
    },
    bars: {
      xAxisId: 'bottom',
      yAxisId: 'left',
    },
    referenceLines: {
      xAxisId: 'bottom',
      yAxisId: 'left',
    },
    lineChartBase: {
      margin: {
        left: settings?.yAxis?.label ? 12 : 0,
        bottom: settings?.xAxis?.label ? 30 : 0,
      },
    },
    barChartBase: {
      margin: {
        left: settings?.yAxis?.label ? 12 : 0,
        bottom: settings?.xAxis?.label ? 20 : 0,
      },
      stackOffset: 'sign', // <--- sign knows how to deal with negative values, while default stackOffset just hides them (doesn't show them).
    },
  };
}

export { getMergedChartSettings };
