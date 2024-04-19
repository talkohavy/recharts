/**
 * @typedef {import('../../components/charts/types').SingleBar} SingleBar
 * @typedef {import('../../components/charts/types').ReferenceLine} ReferenceLine
 */

import { useState } from 'react';
import BarChartWithSpinner from '../../components/BarChartWithSpinner';
import { COLORS } from '../../components/charts/constants';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import NumberInput from '../../components/NumberInput';

/** @type {Array<SingleBar>} */
const barsRaw = [
  {
    name: 'National GDP',
    // color: 'red',
    unit: 'cm',
    // barBorderColor: 'black',
    data: [
      { color: COLORS[0], x: 'Israel', y: 140 },
      { color: COLORS[1], x: 'France', y: 120 },
      { color: COLORS[2], x: 'England', y: 160 },
      { color: COLORS[3], x: 'USA', y: 20 },
      { color: COLORS[4], x: 'China', y: 200 },
      { color: COLORS[5], x: 'Belgium', y: 80 },
      { color: COLORS[6], x: 'Bulgaria', y: 400 },
      { color: COLORS[7], x: 'Russia', y: 220 },
    ],
  },
];

export default function PlaygroundBarChart() {
  const [showBorder, setShowBorder] = useState(true);
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [xTickAngle, setXTickAngle] = useState(0);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

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
    <div className='flex size-full flex-col items-center justify-start gap-10 overflow-auto border border-black p-6'>
      <h1 className='self-center text-3xl font-bold'>BarChart Playground</h1>

      <div className='flex w-full flex-grow items-start justify-start gap-4 overflow-auto'>
        <div className='flex size-full grow flex-col items-start justify-start gap-6 overflow-auto rounded-md border p-6'>
          <div className='text-xl font-bold'>Your BarChart will be rendered below</div>
          <div className='text-xl font-bold'>▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼</div>

          <div className='size-full h-xs max-h-md shrink-0'>
            {/* Write your BarChart Code Below Here */}
            <BarChartWithSpinner
              bars={bars}
              xLabel={xLabel}
              yLabel={yLabel}
              xTickRotateAngle={xTickAngle}
              showGrid={showGrid}
              isLoading={isLoading}
              activeBarId={activeBarId}
              onClickBar={handleClickBar}
              // onClickBar={({ name, payload }) => {
              //   const newActiveBarId = `${name}-${payload.x}`;
              //   setActiveBarId(newActiveBarId);
              // }}
              showLegend={showLegend}
              showZoomSlider={showZoomSlider}
              // referenceLines={referenceLines}
              style={{ fontFamily: 'Hiragino Sans GB,Arial,sans-serif', border: showBorder && '1px solid black' }}
            />
          </div>

          <Checkbox
            isChecked={showBorder}
            setIsChecked={() => setShowBorder((flag) => !flag)}
            label='Show Bounding Box'
          />
          <Input value={xLabel} setValue={setXLabel} placeholder='x label (i.e. countries)' />
          <Input value={yLabel} setValue={setYLabel} placeholder='y label (i.e. Amount in GDP)' />
          <NumberInput value={xTickAngle} setValue={setXTickAngle} />
          <Checkbox
            isChecked={showZoomSlider}
            setIsChecked={() => setShowZoomSlider((flag) => !flag)}
            label='Show zoom scrollbar'
          />
          <Checkbox isChecked={showLegend} setIsChecked={() => setShowLegend((flag) => !flag)} label='Show Legend' />
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

        <div className='size-full overflow-auto rounded-md border bg-blue-50/50 p-4'>
          <pre>{JSON.stringify(barsRaw, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
