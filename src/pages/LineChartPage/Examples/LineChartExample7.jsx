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
    dot: {
      r: 30,
    },
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 151, dot: { r: 20, fill: 'red', stroke: 'black' } },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
    ],
  },
];

export default function LineChartExample7() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 7:</div>

      <p>A Line chart with 1 singled out point</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          showGrid
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
