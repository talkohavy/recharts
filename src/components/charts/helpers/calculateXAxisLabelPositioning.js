/**
 * @description
 * This function is specific for LineChart (for now).
 * @param {{
 *   showLegend: boolean,
 *   xRotateAngle: number
 * }} props
 */
function calculateXAxisLabelPositioning({ showLegend, xRotateAngle }) {
  if (showLegend) return 20; // no matter what the angle is!

  if (!showLegend && xRotateAngle > 0) return 0;

  return 10;
}

export { calculateXAxisLabelPositioning };
