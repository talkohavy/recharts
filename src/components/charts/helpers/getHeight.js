/**
 * @description
 * The theta angle is in degrees.
 * @param {{
 *   angle: number,
 *   maxWidth?: number,
 * }} props
 * @returns {number | undefined}
 */
function getHeight(props) {
  const { angle: thetaInDegrees, maxWidth } = props;

  const RECTANGLE = { height: 25, width: maxWidth };

  if (!thetaInDegrees) return;

  const hypotenuse = Math.sqrt(RECTANGLE.height ** 2 + RECTANGLE.width ** 2);
  const initialThetaInDegrees = (Math.atan(RECTANGLE.height / RECTANGLE.width) * 180) / Math.PI; // <--- To go from radians to degrees one must multiply by (180/PI).
  const fixedThetaInDegrees = thetaInDegrees - initialThetaInDegrees;
  const fixedThetaInRadians = (fixedThetaInDegrees / 180) * Math.PI;
  return Math.abs(Math.sin(fixedThetaInRadians) * hypotenuse);
}

export { getHeight };
