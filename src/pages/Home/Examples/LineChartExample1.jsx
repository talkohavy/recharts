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
      { x: 'Page A', y: 190000000 }, // x: 0 | Page A
      { x: 'Page B', y: 191000000 }, // x: 10 | Page B
      { x: 'Page C', y: 192000000 }, // x: 20 | Page C
      { x: 'Page D', y: 193000000 }, // x: 30 | Page D
      { x: 'Page E', y: 194000000 }, // x: 40 | Page E
      { x: 'Page F', y: 194500000 }, // x: 50 | Page F
    ],
  },
];

export default function LineChartExample1() {
  return (
    <div className='flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 1:</div>

      <p>A simple Line chart</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          xLabel='Countries'
          // yLabel='Amount of cart'
          lines={lines}
          showGrid
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
