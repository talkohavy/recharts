const EXTRA_GAP_BETWEEN_TICKS_AND_LABEL = 10;

/**
 * @description
 * Gets the horizontal width of a rotated text.
 * The angle is in degrees.
 * @param {{
 *   angle: number,
 *   maxWidth?: number,
 * }} props
 * @returns {number | undefined}
 */
function getHeight(props) {
  const { angle: thetaInDegrees, maxWidth } = props;

  if (!thetaInDegrees) return;

  const RECTANGLE = { height: 25, width: maxWidth + EXTRA_GAP_BETWEEN_TICKS_AND_LABEL };

  const thetaInRadians = thetaInDegrees * (Math.PI / 180);
  const initialThetaInRadians = Math.atan(RECTANGLE.height / RECTANGLE.width);
  const fixedThetaInRadians = thetaInRadians - initialThetaInRadians;

  const hypotenuse = Math.sqrt(RECTANGLE.height ** 2 + RECTANGLE.width ** 2);
  return Math.abs(Math.sin(fixedThetaInRadians) * hypotenuse);
}

/**
 * @description
 * Gets the horizontal width of a rotated text.
 * The angle is in degrees.
 * @param {{
 *   angle: number,
 *   maxWidth?: number,
 * }} props
 * @returns {number | undefined}
 */
function getWidth(props) {
  const { angle: thetaInDegrees, maxWidth } = props;

  if (!thetaInDegrees) return;

  const RECTANGLE = { height: 25, width: maxWidth + EXTRA_GAP_BETWEEN_TICKS_AND_LABEL };

  const thetaInRadians = thetaInDegrees * (Math.PI / 180);
  const initialThetaInRadians = Math.atan(RECTANGLE.height / RECTANGLE.width);
  const fixedThetaInRadians = thetaInRadians - initialThetaInRadians;

  const hypotenuse = Math.sqrt(RECTANGLE.height ** 2 + RECTANGLE.width ** 2);
  return Math.abs(Math.cos(fixedThetaInRadians) * hypotenuse);
}

export { getHeight, getWidth };
