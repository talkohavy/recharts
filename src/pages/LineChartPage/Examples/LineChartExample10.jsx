import { COLORS } from '../../../components/charts/constants';
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
    color: COLORS[7],
    curveType: 'monotone',
    data: [
      { x: '0', y: 100 },
      { x: '100000', y: 300 },
      { x: '200000', y: 150 },
      { x: '300000', y: 200 },
      { x: '400000', y: 80 },
      { x: '500000', y: 180 },
      { x: '600000', y: 225 },
      { x: '700000', y: 150 },
      { x: '800000', y: 80 },
      { x: '900000', y: 70 },
      { x: '1000000', y: 120 },
      { x: '1100000', y: 210 },
      { x: '1200000', y: 230 },
      { x: '1300000', y: 245 },
      { x: '1400000', y: 160 },
      { x: '1500000', y: 145 },
      { x: '1600000', y: 115 },
      { x: '1700000', y: 190 },
      { x: '1800000', y: 200 },
      { x: '1900000', y: 230 },
      { x: '2000000', y: 170 },
      { x: '2000000', y: 120 },
      { x: '2100000', y: 80 },
      { x: '2200000', y: 60 },
      { x: '2300000', y: 80 },
      { x: '2400000', y: 120 },
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
          settings={{
            grid: { show: true },
            zoomSlider: { show: true },
            xAxis: {
              tickAngle: 45,
            },
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
