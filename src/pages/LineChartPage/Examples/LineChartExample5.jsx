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
    color: '#ff7300',
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 400 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 300 },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 280 },
      { x: 'Page F', y: 180 },
    ],
  },
  {
    name: 'line2',
    color: 'blue',
    curveType: 'monotone',
    isDashed: true,
    data: [
      { x: 'Page A', y: 800 },
      { x: 'Page B', y: 100 },
      { x: 'Page C', y: 500 },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 380 },
      { x: 'Page F', y: 480 },
    ],
  },
  {
    name: 'line3',
    color: 'green',
    curveType: 'monotone',
    data: [
      { x: 'Page A', y: 200 },
      { x: 'Page B', y: 500 },
      { x: 'Page C', y: 100 },
      { x: 'Page D', y: 400 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 300 },
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
