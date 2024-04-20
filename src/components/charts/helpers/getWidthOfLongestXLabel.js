import { FORMATTERS } from './formatters';
import { getTextWidth } from './getTextWidth';

function getWidthOfLongestXLabel({ transformedDataForRecharts, xAxisType }) {
  let widthOfLongestXTickLabel = 0;

  transformedDataForRecharts.forEach(({ x: currentXTickValue }) => {
    const currentXTickWidth = getTextWidth({
      text: FORMATTERS[xAxisType](currentXTickValue),
    });

    if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
  });

  return widthOfLongestXTickLabel;
}

export { getWidthOfLongestXLabel };
