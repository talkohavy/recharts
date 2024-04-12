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
      { x: 'Page A', y: 400 }, // x: 0 | Page A
      { x: 'Page B', y: 300 }, // x: 10 | Page B
      { x: 'Page C', y: 300 }, // x: 20 | Page C
      { x: 'Page D is very long', y: 200 }, // x: 30 | Page D
      { x: 'Page E', y: 280 }, // x: 40 | Page E
      { x: 'Page F Very Long Value', y: 180 }, // x: 50 | Page F
    ],
  },
];

export default function LineChartExample3() {
  return (
    <div className='mb-6 flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 3:</div>

      <p>A simple Line chart with a 45 degrees angle xAxis</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          yLabel='Amount'
          xLabel='List of Alligators'
          showGrid
          xRotateAngle={46}
          xPadding={{ right: 25 }} // fixes the last xAxis word being cut from the right!
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            // border: '1px solid black'
          }}
        />
      </div>
    </div>
  );
}
