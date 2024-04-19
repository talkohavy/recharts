import { formatLabel } from './formatters';
import { getTextWidth } from './getTextWidth';

/**
 * @param {Array<any>} niceTicks
 * @param {string} suffix
 */
function calculateLongestNiceTickWidth(niceTicks, suffix = '') {
  let widthOfLongestTickLabel = 0;

  niceTicks.forEach((currentTickValue) => {
    const currentTickWidth = getTextWidth({ text: `${formatLabel(currentTickValue)}${suffix}` });

    if (widthOfLongestTickLabel < currentTickWidth) {
      widthOfLongestTickLabel = currentTickWidth;
    }
  });

  return widthOfLongestTickLabel;
}

export { calculateLongestNiceTickWidth };
