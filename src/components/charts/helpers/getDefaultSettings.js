import { formatLabel } from './formatters';

function getDefaultSettings({ xLabel, yLabel, showGrid, gridColor }) {
  return {
    xAxis: {
      domain: ['auto', 'auto'],
      allowDataOverflow: false,
      dataKey: 'x',
      textAnchor: 'end', // <--- CustomizedAxisTick assumes this will always be set to 'end'. We calculate x with it. It's easier to render angled xAxis ticks that way.
      stroke: '#666', // <--- this is the color of the xAxis line itself!
      xAxisId: 'bottom',
      padding: { right: 40 }, // <--- you can use this to remove padding between: A. The first bar and the Y axis; B. The last bar and the chart axis. I'm using 40 to have the last dot always visible in case the last data point is a large red dot - 40 would make it visible.
    },
    yAxis: {
      type: 'number', // <--- defaults to 'number'. 'category' or 'number'.
      stroke: '#666',
      yAxisId: 'left',
      padding: { top: 18 },
      tickFormatter: formatLabel,
    },
    grid: {
      stroke: gridColor,
      horizontal: !!(showGrid === true || showGrid.showHorizontalLines),
      vertical: !!(showGrid === true || showGrid.showVerticalLines),
      strokeDasharray: '5 5',
      syncWithTicks: true,
    },
    legend: {
      layout: 'horizontal', // <--- how to align items of the legend.
      verticalAlign: 'bottom', // <--- pin legend to top, bottom or center.
      align: 'left', // <--- defaults to 'center'. Horizontal alignment.
      iconSize: 14, // <--- defaults to 14
      formatter: (value) => formatLabel(value, 14),
    },
    tooltip: {},
    zoomSlider: {
      stroke: '#4b5af1',
    },
    line: {
      xAxisId: 'bottom',
      yAxisId: 'left',
    },
    bar: {
      xAxisId: 'bottom',
      yAxisId: 'left',
    },
    referenceLines: {
      xAxisId: 'bottom',
      yAxisId: 'left',
    },
    lineChartBase: {
      margin: { left: yLabel ? 12 : 0, bottom: xLabel ? 30 : 0 },
    },
    barChartBase: {
      margin: { left: yLabel ? 12 : 0, bottom: xLabel ? 20 : 0 },
      stackOffset: 'sign', // <--- sign knows how to deal with negative values, while default stackOffset just hides them (doesn't show them).
    },
  };
}

export { getDefaultSettings };
