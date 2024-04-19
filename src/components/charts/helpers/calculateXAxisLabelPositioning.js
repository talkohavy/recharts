/**
 * @description
 * This function is specific for LineChart (for now).
 * @param {{
 *   showLegend: boolean,
 *   showZoomSlider: boolean,
 *   xTickRotateAngle: number
 *   chartType: 'LineChart' | 'BarChart'
 * }} props
 */
function calculateXAxisLabelPositioning(props) {
  const { showLegend, showZoomSlider, xTickRotateAngle, chartType } = props;

  if (showLegend && showZoomSlider) return 40; // no matter what the angle is!

  if (showLegend || showZoomSlider) return 20; // no matter what the angle is!

  if (!showLegend && xTickRotateAngle > 0) return 0;

  if (chartType === 'LineChart') return 10;

  // chartType is BarChart:
  return 0;
}

export { calculateXAxisLabelPositioning };
