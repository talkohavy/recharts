const canvas = document.createElement('canvas');

/**
 * @param {{
 *   text: string,
 *   fontSize?: number,
 *   fontFamily?: string
 * }} props
 */
function getTextWidth(props) {
  const { text, fontSize = 16, fontFamily = 'Hiragino Sans GB' } = props;

  const context = canvas.getContext('2d');
  context.font = `${fontSize}px ${fontFamily}`;

  return context.measureText(text).width;
}

export { getTextWidth };
