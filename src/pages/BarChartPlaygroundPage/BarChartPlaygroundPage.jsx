import { useState } from 'react';
import BarChartWithSpinner from '../../components/BarChartWithSpinner';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import NumberInput from '../../components/NumberInput';

// import { COLORS } from '../../components/charts/constants';

/**
 * @typedef {import('../../components/charts/types').BarSeries} BarSeries
 * @typedef {import('../../components/charts/types').BarSeriesData} BarSeriesData
 * @typedef {import('../../components/charts/types').ReferenceLine} ReferenceLine
 */

function generateData() {
  const barCount = Math.floor(Math.random() * 200);
  /** @type {BarSeriesData} */
  const randomDataset = [];

  const oneDay = 1000 * 60 * 60 * 24;
  const addGap = oneDay * 30;

  for (let i = 0; i < barCount; i++) {
    const shouldAddGap = i > barCount / 2;

    randomDataset.push({
      x: Date.now() + i * oneDay + (shouldAddGap ? addGap : 0),
      y: 10 + Math.floor(Math.random() * 200),
    });
  }

  return randomDataset;
}

const data = generateData();

/** @type {Array<BarSeries>} */
const barsRaw = [
  {
    name: 'National GDP',
    // color: 'red',
    // unit: 'cm',
    // barBorderColor: 'black',
    data,
  },
  {
    name: 'Liters',
    color: 'red',
    data,
  },
];

export default function BarChartPlaygroundPage() {
  const [showBorder, setShowBorder] = useState(true);
  const [showAsCard, setShowAsCard] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [yTickSuffix, setYTickSuffix] = useState('');
  const [xTickAngle, setXTickAngle] = useState(45);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showPreviewInSlider, setShowPreviewInSlider] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const [bars, setBars] = useState(barsRaw);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  const [activeBarId, setActiveBarId] = useState(null);

  const handleClickBar = ({ name, payload }) => {
    setIsLoading(true);
    console.log('props is:', { name, payload });

    setTimeout(() => {
      setBars([
        {
          name: 'Type A',
          stackId: 'a',
          color: 'orange',
          data: [
            { x: 'Israel', y: 900 },
            { x: 'USA', y: 800 },
            { x: 'France', y: 500 },
            { x: 'England', y: 700 },
            { x: 'Italy', y: 400 },
            { x: 'Russia', y: 100 },
            { x: 'Germany', y: 200 },
            { x: 'China', y: 300 },
          ],
        },
        {
          name: 'Type B',
          stackId: 'a',
          data: [
            { x: 'Israel', y: 990 },
            { x: 'USA', y: 865 },
            { x: 'France', y: 567 },
            { x: 'England', y: 705 },
            { x: 'Italy', y: 435 },
            { x: 'Russia', y: 165 },
            { x: 'Germany', y: 267 },
            { x: 'China', y: 333 },
          ],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className='flex size-full flex-col items-center justify-start gap-10 overflow-auto p-6'>
      <h1 className='self-center text-3xl font-bold'>BarChart Playground</h1>

      <div className='flex w-full flex-grow items-start justify-start gap-4 overflow-auto'>
        <div className='flex h-full w-3/4 grow flex-col items-start justify-start gap-6 overflow-auto rounded-md border p-6'>
          <div className='size-full h-md max-h-md shrink-0'>
            {/* Write your BarChart Code Below Here */}
            <BarChartWithSpinner
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
                  showHorizontalLines: showGrid.showHorizontalLines,
                  // @ts-ignore
                  showVerticalLines: showGrid.showVerticalLines,
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
              type='datetime'
              bars={bars}
              isLoading={isLoading}
              activeBarId={activeBarId}
              onClickBar={handleClickBar}
              // onClickBar={({ name, payload }) => {
              //   const newActiveBarId = `${name}-${payload.x}`;
              //   setActiveBarId(newActiveBarId);
              // }}
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

              <button
                type='button'
                onClick={() => {
                  setBars((prev) => {
                    const newBars = [...prev];
                    const newBar = newBars[0].data.at(-1);
                    const oneDay = 1000 * 60 * 60 * 24;
                    newBar.x = +newBar.x + oneDay;
                    newBar.y += 100;
                    newBar.color = 'green';

                    newBars[0].data.push(newBar);

                    return newBars;
                  });
                }}
              >
                Add Bar
              </button>
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
                label='Show Bar values'
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

        <div className='h-full w-1/4 overflow-auto rounded-md border bg-blue-50/50 p-4'>
          <pre>{JSON.stringify(barsRaw, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
