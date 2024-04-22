import { useState } from 'react';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import LineChartWithSpinner from '../../components/LineChartWithSpinner';
import NumberInput from '../../components/NumberInput';
import Select from '../../components/Select';
import { mainExample } from './examples/index';

/**
 * @typedef {import('../../components/charts/types').LineSeries} LineSeries
 * @typedef {import('../../components/charts/types').LineSeriesData} LineSeriesData
 * @typedef {import('../../components/charts/types').ReferenceLine} ReferenceLine
 */

// function customDateFormatter(date) {
//   const options = {
//     // weekday: 'short', // undefined | short | long
//     dayPeriod: 'short',
//     year: 'numeric',
//     month: 'numeric', // numeric | short | long
//     day: 'numeric',
//     hour: 'numeric',
//     hour12: false, // defaults to true. false is 24H
//     minute: 'numeric',
//     // second: 'numeric',
//     // timeZone: 'Australia/Sydney',
//     // timeZoneName: 'short',
//   };
//   // @ts-ignore
//   const formattedDate = Intl.DateTimeFormat('en-US', options).format(date);

//   return formattedDate;
// }

const lineTypeOptions = [
  { value: 'category', label: 'Category' },
  { value: 'number', label: 'Number' },
  { value: 'datetime', label: 'Datetime' },
];

export default function LineChartPlaygroundPage() {
  const [showBorder, setShowBorder] = useState(true);
  const [showAsCard, setShowAsCard] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [xAxisTypeOption, setXAxisTypeOption] = useState(lineTypeOptions[0]);
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [yTickSuffix, setYTickSuffix] = useState('');
  const [xTickAngle, setXTickAngle] = useState(0);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showPreviewInSlider, setShowPreviewInSlider] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-10 overflow-auto border border-black p-6'>
      <h1 className='self-center text-3xl font-bold'>BarChart Playground</h1>

      <div className='flex w-full flex-grow items-start justify-start gap-4 overflow-auto'>
        <div className='flex h-full w-3/5 grow flex-col items-start justify-start gap-6 overflow-auto rounded-md border p-6'>
          <div className='h-md max-h-md w-full shrink-0'>
            {/* Write your BarChart Code Below Here */}
            <LineChartWithSpinner
              // @ts-ignore
              type={xAxisTypeOption.value}
              lines={mainExample}
              settings={{
                general: {
                  isAnimationActive: false,
                  showValues,
                },
                xAxis: {
                  // show: true,
                  label: xLabel,
                  tickAngle: xTickAngle,
                  // tickFormatter: customDateFormatter,
                  // tickFormatter: () => {},
                  // tickSuffix: 'cm'
                },
                yAxis: {
                  // show: true,
                  label: yLabel,
                  tickSuffix: yTickSuffix,
                  // tickFormatter: () => {},
                },
                grid: {
                  show: showGrid,
                  color: 'red',
                  // @ts-ignore
                  showHorizontalLines: showGrid?.showHorizontalLines,
                  // @ts-ignore
                  showVerticalLines: showGrid?.showVerticalLines,
                },
                legend: {
                  show: showLegend,
                },
                tooltip: {
                  // show: true,
                  // xValueFormatter: customDateFormatter,
                  // yValueFormatter: ()=>{}
                },
                lines: {
                  // connectNulls: true,
                },
                zoomSlider: {
                  show: showZoomSlider,
                  showPreviewInSlider,
                },
              }}
              // referenceLines={referenceLines}
              className={showAsCard && 'rounded-lg border border-neutral-300 p-4 font-thin'}
              style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: showBorder && '1px solid black' }}
            />
          </div>

          <div className='flex items-start justify-between gap-6'>
            <div className='flex flex-col items-start justify-between gap-3'>
              <Select selectedOption={xAxisTypeOption} setOption={setXAxisTypeOption} options={lineTypeOptions} />
              <Input value={xLabel} setValue={setXLabel} placeholder='x label (i.e. countries)' />
              <Input value={yLabel} setValue={setYLabel} placeholder='y label (i.e. Amount in GDP)' />
              <Input value={yTickSuffix} setValue={setYTickSuffix} placeholder='y tick suffix (i.e. cm)' />
              <NumberInput value={xTickAngle} setValue={setXTickAngle} />
            </div>

            <div className='flex flex-col items-start justify-start gap-3'>
              <Checkbox
                isChecked={showBorder}
                setIsChecked={() => setShowBorder((flag) => !flag)}
                label='Show Bounding Box'
              />
              <Checkbox
                isChecked={showAsCard}
                setIsChecked={() => setShowAsCard((flag) => !flag)}
                label='Show as Card'
              />
              <Checkbox
                isChecked={showValues}
                setIsChecked={() => setShowValues((flag) => !flag)}
                label='Show values'
              />
              <Checkbox
                isChecked={showZoomSlider}
                setIsChecked={() => setShowZoomSlider((flag) => !flag)}
                label='Show zoom slider'
              />
              <Checkbox
                isChecked={showPreviewInSlider}
                setIsChecked={() => setShowPreviewInSlider((flag) => !flag)}
                label='Show preview in slider'
              />
              <Checkbox
                isChecked={showLegend}
                setIsChecked={() => setShowLegend((flag) => !flag)}
                label='Show Legend'
              />
              <Checkbox isChecked={showGrid} setIsChecked={() => setShowGrid((flag) => !flag)} label='Show Grid' />

              <div className='flex items-center gap-6 px-10'>
                <Checkbox
                  // @ts-ignore
                  isChecked={showGrid?.showHorizontalLines}
                  // @ts-ignore
                  setIsChecked={() => setShowGrid({ showHorizontalLines: true })}
                  label='Only horizontal'
                />
                <Checkbox
                  // @ts-ignore
                  isChecked={showGrid?.showVerticalLines}
                  // @ts-ignore
                  setIsChecked={() => setShowGrid({ showVerticalLines: true })}
                  label='Only vertical'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='h-full w-2/5 overflow-auto rounded-md border bg-blue-50/50 p-4'>
          <pre>{JSON.stringify(mainExample, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
