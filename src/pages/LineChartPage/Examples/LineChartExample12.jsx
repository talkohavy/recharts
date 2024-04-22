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
    color: 'black',
    curveType: 'monotone',
    data: [
      { x: 'Page A', y: 100 },
      { x: 'Page B', y: 300 },
      { x: 'Page C', y: 150 },
      { x: 'Page D', y: 200 },
      { x: 'Page E', y: 80 },
      { x: 'Page F', y: 180 },
      { x: 'Page G', y: 225 },
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
      { x: 'Page C', y: 500, dot: { r: 15 } },
      // { x: 'Page D', y: 200 },
      { x: 'Page E', y: 380, dot: { r: 15 } },
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

export default function LineChartExample12() {
  return (
    <div className='flex h-2xl w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 12: Combination</div>

      <p>A LineChart with:</p>

      <ul className='px-4'>
        <li>• multiple lines</li>
        <li>• angled ticks</li>
        <li>• legend</li>
        <li>• zoom slider</li>
        <li>• x & y axis labels</li>
        <li>• singled out dots</li>
        <li>• null value</li>
      </ul>

      <div className='size-full max-h-md max-w-lg'>
        <LineChart
          lines={lines}
          settings={{
            xAxis: { label: 'Flying Cars', tickAngle: 45 },
            yAxis: { label: 'Amount in Liters' },
            grid: { show: true },
            legend: { show: true },
            zoomSlider: { show: true },
          }}
          style={{
            fontFamily: 'Hiragino Sans GB,Arial,sans-serif',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}
