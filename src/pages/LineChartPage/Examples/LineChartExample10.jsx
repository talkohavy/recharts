import { COLORS } from '../../../components/charts/constants';
import LineChart from '../../../components/charts/LineChart';

/**
 * @typedef {import('../../../components/charts/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/types').SingleLine} SingleLine
 * @typedef {import('../../../components/charts/types').ReferenceLine} ReferenceLine
 */

/** @type {Array<SingleLine>} */
const lines = [
  {
    name: 'line1',
    color: COLORS[7],
    curveType: 'monotone',
    data: [
      { x: 0, y: 100 },
      { x: 1, y: 300 },
      { x: 2, y: 150 },
      { x: 3, y: 200 },
      { x: 4, y: 80 },
      { x: 5, y: 180 },
      { x: 6, y: 225 },
      { x: 7, y: 150 },
      { x: 8, y: 80 },
      { x: 9, y: 70 },
      { x: 10, y: 120 },
      { x: 11, y: 210 },
      { x: 12, y: 230 },
      { x: 13, y: 245 },
      { x: 14, y: 160 },
      { x: 15, y: 145 },
      { x: 16, y: 115 },
      { x: 17, y: 190 },
      { x: 18, y: 200 },
      { x: 19, y: 230 },
      { x: 20, y: 170 },
      { x: 20, y: 120 },
      { x: 21, y: 80 },
      { x: 22, y: 60 },
      { x: 23, y: 80 },
      { x: 24, y: 120 },
    ],
  },
];

export default function LineChartExample10() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 10:</div>

      <p>LineChart has a zoom slider</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          showGrid
          showZoomSlider
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
