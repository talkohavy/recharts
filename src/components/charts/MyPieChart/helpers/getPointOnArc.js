import { PIE_CHART } from '../constants';
import { getDirectionFromAngle } from './getDirectionFromAngle';

/**
 * @description
 * Function to calculate endpoint of arc given center, radius, and angle in degrees.
 * @param {{radius: number, angleInRadians: number}} props
 */
function getPointOnArc({ radius, angleInRadians }) {
  const dir = getDirectionFromAngle(angleInRadians);

  const x = PIE_CHART.centerPoint.x + dir.xDirection * radius;
  const y = PIE_CHART.centerPoint.y + dir.yDirection * radius;

  return { x, y };
}

export { getPointOnArc };
