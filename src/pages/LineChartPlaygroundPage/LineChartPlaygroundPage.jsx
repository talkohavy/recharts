import { useState } from 'react';
import { COLORS } from '../../components/charts/constants';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import LineChartWithSpinner from '../../components/LineChartWithSpinner';
import NumberInput from '../../components/NumberInput';

// import { COLORS } from '../../components/charts/constants';

/**
 * @typedef {import('../../components/charts/types').LineSeries} LineSeries
 * @typedef {import('../../components/charts/types').LineSeriesData} LineSeriesData
 * @typedef {import('../../components/charts/types').ReferenceLine} ReferenceLine
 */

function generateXAxisValues() {
  const dataPointsCount = Math.floor(Math.random() * 200);

  /** @type {LineSeriesData} */
  const dataSets = [];

  const oneDay = 1000 * 60 * 60 * 24;
  const addGap = oneDay * 30;

  for (let i = 0; i < dataPointsCount; i++) {
    const shouldAddGap = i > dataPointsCount / 2;

    const pointWithXValue = { x: Date.now() + i * oneDay + (shouldAddGap ? addGap : 0) };

    // @ts-ignore
    dataSets.push(pointWithXValue);
  }

  return dataSets;
}

function generateDataForSeries(xAxisPoints) {
  const dataForSeries = xAxisPoints.map((item) => ({ ...item }));

  dataForSeries.forEach((p, index) => {
    if (index === dataForSeries.length / 2) {
      p.y = null;
    } else {
      p.y = 10 + Math.floor(Math.random() * 200);
    }
  });

  return dataForSeries;
}

const xAxisValues = generateXAxisValues();

/** @type {Array<LineSeries>} */
const lines = [
  {
    name: 'National GDP',
    curveType: 'monotone',
    color: COLORS[0],
    unit: 'cm',
    showValues: false,
    data: generateDataForSeries(xAxisValues),
  },
  {
    name: 'Dark Matter',
    curveType: 'monotone',
    color: COLORS[1],
    unit: 'km',
    showValues: false,
    data: generateDataForSeries(xAxisValues),
  },
];

export default function LineChartPlaygroundPage() {
  const [showBorder, setShowBorder] = useState(true);
  const [showAsCard, setShowAsCard] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [yTickSuffix, setYTickSuffix] = useState('');
  const [xTickAngle, setXTickAngle] = useState(0);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showPreviewInSlider, setShowPreviewInSlider] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-10 overflow-auto border border-black p-6'>
      <h1 className='self-center text-3xl font-bold'>BarChart Playground</h1>

      <div className='flex w-full flex-grow items-start justify-start gap-4 overflow-auto'>
        <div className='flex h-full w-3/5 grow flex-col items-start justify-start gap-6 overflow-auto rounded-md border p-6'>
          <div className='h-md max-h-md w-full shrink-0'>
            {/* Write your BarChart Code Below Here */}
            <LineChartWithSpinner
              type='datetime'
              lines={lines}
              xLabel={xLabel}
              yLabel={yLabel}
              yTickSuffix={yTickSuffix}
              xTickRotateAngle={xTickAngle}
              showGrid={showGrid}
              showLegend={showLegend}
              showZoomSlider={showZoomSlider}
              showPreviewInSlider={showPreviewInSlider}
              showValues={showValues}
              // referenceLines={referenceLines}
              className={showAsCard && 'rounded-lg border border-neutral-300 p-4 font-thin'}
              style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: showBorder && '1px solid black' }}
            />
          </div>

          <div className='flex items-start justify-between gap-6'>
            <div className='flex flex-col items-start justify-between gap-3'>
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
          <pre>{JSON.stringify(lines, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
