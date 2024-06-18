import { useCallback } from 'react';
import { wrapInDebounce } from '@talkohavy/lodash';

/**
 * @description
 * HOW TO USE:
 *
 * - Step 1: Define a useState outside this hook named [isCloseToBottom, setIsCloseToBottom]
 * - Step 2: call the hook and pass to it both the value and its setter
 * - Step 3: from the hook, extract the handleElementScroll function
 * - Step 4: pass the handleElementScroll function to an `onScroll` attribute on your element.
 * - Step 5: (optional) it would be easier for you to see height of longFilm if you wrap the child items in an extra div like so:
 *
 * <div className='viewLens' onScroll={handleElementScroll}>
 *   <div className='longFilm'>
 *     <div>child 1</div>
 *     <div>child 2</div>
 *     <div>child 3</div>
 *     <div>child ...</div>
 *   </div>
 * </div>
 *
 * The hook will then set the `isCloseToBottom` value for you, using a debounce with a delay of 100ms (default value).
 * You can choose to override the default delay, and pass a different value to `delayMs`.
 * @param {{
 *   isAlreadyAtBottom: boolean,
 *   isAlreadyAtTop: boolean,
 *   setIsCloseToBottom: (value: boolean) => void,
 *   setIsCloseToTop: (value: boolean) => void,
 *   bottomThreshold?: number,
 *   topThreshold?: number,
 *   delayMs?: number
 * }} props
 */
export default function useIsCloseToEdges(props) {
  const {
    isAlreadyAtBottom,
    isAlreadyAtTop,
    setIsCloseToBottom,
    setIsCloseToTop,
    bottomThreshold = 25,
    topThreshold = 25,
    delayMs = 0,
  } = props;

  // eslint-disable-next-line
  const handleElementScroll = useCallback(
    wrapInDebounce((e) => {
      const {
        scrollHeight: heightOfLongFilm,
        scrollTop: distanceBetweenTwoTopBars,
        clientHeight: heightOfLens,
      } = e.target;

      const distanceFromBottom = heightOfLongFilm - distanceBetweenTwoTopBars - heightOfLens; // <--- draw this on a piece of paper and you will understand!
      const distanceFromTop = distanceBetweenTwoTopBars;

      // Case 1: switch closeToTop to true, because switched from being below the top, to being above the top threshold.
      if (distanceFromTop <= topThreshold && isAlreadyAtTop === false) return setIsCloseToTop(true);

      // Case 2: switch closeToTop to false, because switched from being at the top, to being below the top threshold.
      if (distanceFromTop > topThreshold && isAlreadyAtTop === true) return setIsCloseToTop(false);

      // Case 3: switch closeToBottom to true, because switched from not being at the bottom to being below the bottom threshold.
      if (distanceFromBottom <= bottomThreshold && !isAlreadyAtBottom) return setIsCloseToBottom(true);

      // Case 4: switch closeToBottom to false, because switched from being at the bottom to being above the bottom threshold.
      if (distanceFromBottom > bottomThreshold && isAlreadyAtBottom) return setIsCloseToBottom(false);
    }, delayMs),
    [isAlreadyAtBottom, isAlreadyAtTop],
  );

  return { handleElementScroll };
}
