const PIE_CHART = {
  xs: { outerRadius: 80 },
  sm: { outerRadius: 100 },
  md: { outerRadius: 120 },
  lg: { outerRadius: 140 },
  xl: { outerRadius: 160 },
};

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#4CAF50',
  '#9C27B0',
  '#FF5722',
  '#795548',
  '#607D8B',
  '#E91E63',
  '#9E9E9E',
  '#2196F3',
  '#3F51B5',
  '#FF9800',
  '#009688',
  '#FFEB3B',
  '#CDDC39',
  '#03A9F4',
  '#8BC34A',
  '#FF5252',
];

/**
 * @param {any} outerRadius
 * @returns {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
 */
function getSizeFromRadius(outerRadius) {
  if (outerRadius >= PIE_CHART.xl.outerRadius) return 'xl';

  if (outerRadius >= PIE_CHART.lg.outerRadius) return 'lg';

  if (outerRadius >= PIE_CHART.md.outerRadius) return 'md';

  if (outerRadius >= PIE_CHART.sm.outerRadius) return 'sm';

  return 'xs';
}

/**
 * @description The prop `percent` is in 100%.
 * @param {{
 *   size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
 *   percent: number
 * }} props
 */
function getFontSizeFrom({ size, percent }) {
  // All Pie pieces of a small PieChart:
  if (size === 'xs') return 8;

  // Tiny Pie slices of 2% or less:
  if (percent <= 2) return 8;

  return 12;
}

export { COLORS, PIE_CHART, getFontSizeFrom, getSizeFromRadius };
