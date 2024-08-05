const EXTRA_GAP_BETWEEN_TICKS_AND_LABEL = 10;

type GetHeightProps = {
  angle: number;
  maxWidth: number;
};

/**
 * @description
 * Gets the horizontal width of a rotated text.
 * The angle is in degrees.
 */
function getHeight(props: GetHeightProps): number | undefined {
  const { angle: thetaInDegrees, maxWidth } = props;

  if (!thetaInDegrees) return;

  const RECTANGLE = { height: 25, width: maxWidth + EXTRA_GAP_BETWEEN_TICKS_AND_LABEL };

  const thetaInRadians = thetaInDegrees * (Math.PI / 180);
  const initialThetaInRadians = Math.atan(RECTANGLE.height / RECTANGLE.width);
  const fixedThetaInRadians = thetaInRadians - initialThetaInRadians;

  const hypotenuse = Math.sqrt(RECTANGLE.height ** 2 + RECTANGLE.width ** 2);
  return Math.abs(Math.sin(fixedThetaInRadians) * hypotenuse);
}

type GetWidthProps = {
  angle: number;
  maxWidth: number;
};

/**
 * @description
 * Gets the horizontal width of a rotated text.
 * The angle is in degrees.
 */
function getWidth(props: GetWidthProps): number | undefined {
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
