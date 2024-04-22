import BarChart from '../../../components/charts/BarChart';

/** @typedef {import('../../../components/charts/types').BarSeries} BarSeries */

/** @type {Array<BarSeries>} */
const bars = [
  {
    name: 'Health Care',
    data: [
      { x: 'Israel', y: 990 },
      { x: 'England', y: 705 },
      { x: 'Finland', y: 314 },
      { x: 'France', y: 567 },
      { x: 'Netherlands', y: 202 },
      { x: 'USA', y: 865 },
      { x: 'Canada', y: 586 },
      { x: 'Russia', y: 165 },
      { x: 'China', y: 333 },
      { x: 'Arab Saudi', y: 13 },
      { x: 'Austria', y: 1003 },
      { x: 'Ukraine', y: 812 },
      { x: 'Italy', y: 435 },
      { x: 'Germany', y: 267 },
      { x: 'Belgium', y: 709 },
      { x: 'Belarus', y: 920 },
      { x: 'Bulgaria', y: 414 },
    ],
  },
];

export default function BarChartExample12() {
  return (
    <div className='flex h-lg w-full max-w-xl grow flex-col items-start justify-start gap-6 border p-6'>
      <div className='text-xl font-bold'>• Example 12:</div>

      <p>BarChart with zoom slider.</p>

      <div className='size-full max-h-md max-w-lg'>
        <BarChart
          bars={bars}
          settings={{
            xAxis: { label: 'Countries', tickAngle: 46 },
            yAxis: { label: 'Amount in cm' },
            legend: { show: true },
            zoomSlider: { show: true },
          }}
          style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: '1px solid black' }}
        />
      </div>
    </div>
  );
}
