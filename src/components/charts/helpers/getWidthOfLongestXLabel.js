import { getTextWidth } from './getTextWidth';

function getWidthOfLongestXLabel({ transformedDataForRecharts, xTickFormatter }) {
  let widthOfLongestXTickLabel = 0;

  transformedDataForRecharts.forEach(({ x: currentXTickValue }) => {
    const currentXTickWidth = getTextWidth({ text: xTickFormatter(currentXTickValue) });

    if (widthOfLongestXTickLabel < currentXTickWidth) widthOfLongestXTickLabel = currentXTickWidth;
  });

  return widthOfLongestXTickLabel;
}

export { getWidthOfLongestXLabel };
