import LineChart from '../../../components/charts/LineChart';

/**
 * @typedef {import('../../../components/charts/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/types').LineSeries} LineSeries
 * @typedef {import('../../../components/charts/types').ReferenceLine} ReferenceLine
 */

/** @type {Array<LineSeries>} */
const lines = [
  {
    name: 'line1',
    color: '#ff7300',
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 0, y: 400 },
      { x: 1, y: 300 },
      { x: 2, y: 300 },
      { x: 3, y: 200 },
      { x: 4, y: 280 },
      { x: 5, y: 180 },
    ],
  },
  {
    name: 'line2',
    color: 'blue',
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 0, y: 800 },
      { x: 1, y: 100 },
      { x: 2, y: 500 },
      { x: 3, y: 200 },
      { x: 4, y: 380 },
      { x: 5, y: 480 },
    ],
  },
  {
    name: 'line3',
    color: 'green',
    curveType: 'monotone',
    data: [
      { x: 0, y: 200 },
      { x: 1, y: 500 },
      { x: 2, y: 100 },
      { x: 3, y: 400 },
      { x: 4, y: 80 },
      { x: 5, y: 300 },
    ],
  },
];

export default function LineChartExample5() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 5:</div>

      <p>Multiple lines</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          showGrid
          showLegend
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
