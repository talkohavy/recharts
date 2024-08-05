/**
 * @param {*} angleInRadians
 * @example
 * // Use them like so:
 * const x = PIE_CHART.centerPoint.x + xDirection * radius;
 * const y = PIE_CHART.centerPoint.y + yDirection * radius;
 */
function getDirectionFromAngle(angleInRadians) {
  return {
    xDirection: Math.cos(angleInRadians),
    yDirection: Math.sin(angleInRadians),
  };
}

export { getDirectionFromAngle };
