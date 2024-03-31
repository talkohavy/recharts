import { COLORS, PIE_CHART } from '../constants';
import { getDirectionFromAngle } from './getDirectionFromAngle';
import { getPointOnArc } from './getPointOnArc';

/**
 * @typedef {import('../../types').SinglePie} SinglePie
 * @typedef {import('../../types').PieChartDrawData} PieChartDrawData
 */

// Function to generate SVG path string for pizza slice
/**
 * @param {{
 *   startAngle: number,
 *   endAngle: number,
 * }} props
 */
function getSliceData({ startAngle, endAngle }) {
  const radius = PIE_CHART.outerRadius;

  // Step 1: get the 2 points on the main arc
  const arcStartPoint = getPointOnArc({ radius, angleInRadians: Math.PI + startAngle });
  const arcEndPoint = getPointOnArc({ radius, angleInRadians: Math.PI + endAngle });

  // Step 2: get direction of middle slice
  const middleDirection = getDirectionFromAngle(Math.PI + (startAngle + endAngle) / 2);

  // Step 3: get 0 of small arc, or 1 if it's a large arc
  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  // Step 4: Construct the d value for the SVG's path
  const path = `M ${PIE_CHART.centerPoint.x},${PIE_CHART.centerPoint.y} 
                L ${arcStartPoint.x},${arcStartPoint.y} 
                A ${radius},${radius} 0 ${largeArcFlag} 1 ${arcEndPoint.x},${arcEndPoint.y} 
                Z`;

  return { path, middleDirection, arcStartPoint, arcEndPoint };
}

/**
 * @param {Array<SinglePie>} data
 * @returns {Array<PieChartDrawData>}
 */
function getPieChart(data) {
  const sum = data.reduce((acc, curItem) => acc + curItem.value, 0);

  /** @type {any} */
  const pieChartDrawData = data.map((curItem, index) => {
    const percent = curItem.value / sum;

    return {
      ...curItem,
      color: curItem.color ?? COLORS[index],
      percent,
      percentFormatted: Math.floor(percent * 100),
      angle: percent * 2 * Math.PI,
    };
  });

  pieChartDrawData[0].startAngle = 0;
  pieChartDrawData[0].endAngle = pieChartDrawData[0].angle;
  for (let i = 1; i < pieChartDrawData.length; i++) {
    pieChartDrawData[i].startAngle = pieChartDrawData[i - 1].endAngle;
    pieChartDrawData[i].endAngle = pieChartDrawData[i - 1].endAngle + pieChartDrawData[i].angle;
  }

  const piChartData = pieChartDrawData.map((item) => {
    const { startAngle, endAngle } = item;

    const sliceData = getSliceData({ startAngle, endAngle });

    return { ...item, ...sliceData };
  });

  return piChartData;
}

export { getPieChart };
