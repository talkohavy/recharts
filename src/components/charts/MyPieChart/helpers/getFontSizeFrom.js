/**
 * @description 100% is actually 1.
 * @param {{percent: number, showActiveShape: boolean}} props
 */
function getFontSizeFrom({ percent, showActiveShape }) {
  // No matter if big pieChart or small pieChart, Pie slices below 2% are 24px:
  if (percent <= 0.03) return 24;

  // PieChart is small version:
  if (showActiveShape) return 30;

  // PieChart is large version:
  return 40;
}

export { getFontSizeFrom };
