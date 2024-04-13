import { formatLabel } from './formatLabel';
import { getTextWidth } from './getTextWidth';

/** @param {Array<any>} niceTicks */
function calculateLongestNiceTickWidth(niceTicks) {
  let widthOfLongestTickLabel = 0;

  niceTicks.forEach((currentTickValue) => {
    const currentTickWidth = getTextWidth({ text: formatLabel(currentTickValue) });

    if (widthOfLongestTickLabel < currentTickWidth) {
      widthOfLongestTickLabel = currentTickWidth;
    }
  });

  return widthOfLongestTickLabel;
}

export { calculateLongestNiceTickWidth };
