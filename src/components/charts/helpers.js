import { ellipsisString, formatNumber } from '../../utils/helpers';

/**
 * @param {string | number} value
 * @returns {string}
 */
function formatLabel(value) {
  if (typeof value === 'string') return ellipsisString(value);

  return formatNumber({ num: value });
}

const RECTANGLE = { height: 25, width: 80 };
/**
 * @param {number} thetaInDegrees
 * @returns {number | undefined}
 */
function getHeight(thetaInDegrees) {
  if (!thetaInDegrees) return;

  const hypotenuse = Math.sqrt(RECTANGLE.height ** 2 + RECTANGLE.width ** 2);
  const initialThetaInDegrees = (Math.atan(RECTANGLE.height / RECTANGLE.width) * 180) / Math.PI; // <--- To go from radians to degrees one must multiply by (180/PI).
  const fixedThetaInDegrees = thetaInDegrees - initialThetaInDegrees;
  const fixedThetaInRadians = (fixedThetaInDegrees / 180) * Math.PI;
  return Math.abs(Math.sin(fixedThetaInRadians) * hypotenuse);
}

export { formatLabel, getHeight };
