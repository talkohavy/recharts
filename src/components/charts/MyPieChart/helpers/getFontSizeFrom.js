/**
 * @description 100% is actually 1.
 * @param {number} percent
 */
function getFontSizeFrom(percent) {
  // Tiny Pie slices of 2% or less:
  if (percent <= 0.03) return 24;

  return 30;
}

export { getFontSizeFrom };
