import LineChart from '../../../components/charts/LineChart';

/**
 * @typedef {import('../../../components/charts/LineChart/types').CurveType} CurveType
 * @typedef {import('../../../components/charts/LineChart/types').SingleLine} SingleLine
 * @typedef {import('../../../components/charts/LineChart/types').ReferenceLine} ReferenceLine
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
      { x: 'Page D', y: 200 }, // x: 30 | Page D
      { x: 'Page E', y: 280 }, // x: 40 | Page E
      { x: 'Very Long Page F', y: 180 }, // x: 50 | Page F
    ],
  },
];

export default function Example2() {
  return (
    <div className='mb-6 flex h-96 w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 2:</div>

      <p>A simple Line chart with a 45 degrees angle xAxis</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          showGrid
          xRotateAngle={-45}
          xDown={20}
          xHeight={50}
          xPadding={{ right: 25 }} // fixes the last xAxis word being cut from the right!
          margin={{ left: 0, bottom: 20, right: 20 }} // <--- bottom:20 helps in cases where XAxis label are cut. left:-30 helps center the chart when a YAxis is being rendered.
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </div>
  );
}
