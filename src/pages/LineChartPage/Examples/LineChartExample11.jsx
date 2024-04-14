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
    color: 'black',
    curveType: 'monotone',
    data: [
      { x: 'Page A wow', y: 4561928100 }, // 'Page A'
      { x: 'Page B I am here', y: 1561928300 }, // 'Page B'
      { x: 'Page C not the same', y: 3561928150 }, // 'Page C'
      { x: 'Page D width', y: 4561928200 }, // 'Page D'
      { x: 'Page E crazy', y: 256192880 }, // 'Page E'
      { x: 'Page F', y: 4561928180 }, // 'Page F'
      { x: 'Page G is very long', y: 2251928180 }, // 'Page G'
    ],
  },
];

export default function LineChartExample11() {
  return (
    <div className='flex h-2xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 11: Combination</div>

      <p>A LineChart with:</p>

      <ul className='px-4'>
        <li>• x & y axis labels</li>
        <li>• a legend</li>
        <li>• x axis ticks are angled</li>
        <li>• tick label is very long</li>
        <li>• y values are very high</li>
      </ul>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          xLabel='Flying Cars'
          yLabel='Amount in Liters'
          xTickRotateAngle={45}
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
