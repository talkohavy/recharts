/**
 * @description
 * This function is specific for LineChart (for now).
 * @param {{
 *   showLegend: boolean,
 *   showZoomSlider: boolean,
 *   xRotateAngle: number
 *   chartType: 'LineChart' | 'BarChart'
 * }} props
 */
function calculateXAxisLabelPositioning(props) {
  const { showLegend, showZoomSlider, xRotateAngle, chartType } = props;

  if (showLegend && showZoomSlider) return 40; // no matter what the angle is!

  if (showLegend) return 20; // no matter what the angle is!

  if (showZoomSlider) return 25; // no matter what the angle is!

  if (!showLegend && xRotateAngle > 0) return 0;

  if (chartType === 'LineChart') return 10;

  // chartType is BarChart:
  return 0;
}

export { calculateXAxisLabelPositioning };
