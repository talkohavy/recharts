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
      { x: 'Page D', y: 200 }, // x: 30 | Page D
      { x: 'Page E', y: 280 }, // x: 40 | Page E
      { x: 'Page F', y: 180 }, // x: 50 | Page F
    ],
  },
];

/** @type {Array<ReferenceLine>} */
const referenceLines = [
  {
    y: 220,
    label: 'Max',
    lineWidth: 2,
    lineColor: 'black',
  },
  {
    x: 'Page B', // 'Page B' | 40
    label: 'Vertical',
    lineColor: 'blue',
    isDashed: true,
  },
];

export default function Example999() {
  return (
    <div className='flex h-xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 999:</div>

      <p>A simple Line chart</p>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          referenceLines={referenceLines}
          xAxisType='category'
          xRotateAngle={-45}
          xDown={20}
          xHeight={50}
          showGrid
          // showLegend
          xPadding={{ right: 30 }} // left: 30, right: 30
          // margin={{ left: 0, bottom: 20, right: 20 }} // <--- bottom:20 helps in cases where XAxis label are cut. left:-30 helps center the chart when a YAxis is being rendered.
          className='rounded-lg border p-6 font-thin' // p-6
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif' }}
        />
      </div>
    </div>
  );
}
