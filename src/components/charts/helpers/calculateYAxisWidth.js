import { getNiceTickValues } from 'recharts-scale';
import { TICK_DASH_WIDTH } from '../constants';
import { calculateLongestNiceTickWidth } from './calculateLongestNiceTickWidth';

function calculateYAxisWidth({ maxYValue, yTickSuffix, yLabel }) {
  const yTickCount = 5;
  const domain = [0, maxYValue];
  const allowDecimals = true;
  const niceYTicks = getNiceTickValues(domain, yTickCount, allowDecimals);

  const longestYTickWidth = calculateLongestNiceTickWidth(niceYTicks, yTickSuffix);

  const yAxisWidth = longestYTickWidth + TICK_DASH_WIDTH + (yLabel ? 8 : 0);

  return yAxisWidth;
}

export { calculateYAxisWidth };
