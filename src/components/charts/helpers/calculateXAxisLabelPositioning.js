/**
 * @description
 * This function is specific for LineChart (for now).
 * @param {{
 *   showLegend: boolean,
 *   showZoomSlider: boolean,
 *   xRotateAngle: number
 * }} props
 */
function calculateXAxisLabelPositioning({ showLegend, showZoomSlider, xRotateAngle }) {
  if (showLegend && showZoomSlider) return 40; // no matter what the angle is!

  if (showLegend) return 20; // no matter what the angle is!

  if (showZoomSlider) return 25; // no matter what the angle is!

  if (!showLegend && xRotateAngle > 0) return 0;

  return 10;
}

export { calculateXAxisLabelPositioning };
