import { BRUSH_HEIGHT, LEGEND_HEIGHT } from '../constants';

/**
 * @param {{
 *   showLegend: boolean,
 *   showZoomSlider: boolean,
 *   chartType: 'LineChart' | 'BarChart'
 * }} props
 */
function calculateXAxisLabelPositioning(props) {
  const { showLegend, showZoomSlider, chartType } = props;

  let xLabelGoesDownBy = 0;

  if (showLegend) xLabelGoesDownBy += LEGEND_HEIGHT;

  if (showZoomSlider) xLabelGoesDownBy += BRUSH_HEIGHT;

  if (chartType === 'LineChart') xLabelGoesDownBy += 10;

  // chartType is BarChart:
  return xLabelGoesDownBy;
}

export { calculateXAxisLabelPositioning };
