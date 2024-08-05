import { useEffect, useState } from 'react';
import useIsCloseToEdges from '../../../hooks/useIsCloseToBottom';
import PlayIcon from '../../svgs/playIcon';
import { formatLabel } from '../helpers';

export default function PieChartLegend({ pieChartData, setSlicesOverrides }) {
  const [isCloseToBottom, setIsCloseToBottom] = useState(false);
  const [isCloseToTop, setIsCloseToTop] = useState(false);
  const { handleElementScroll } = useIsCloseToEdges({
    isAlreadyAtBottom: isCloseToBottom,
    isAlreadyAtTop: isCloseToTop,
    setIsCloseToBottom,
    setIsCloseToTop,
  });
  // @ts-ignore
  useEffect(handleElementScroll, [handleElementScroll]);

  return (
    <div className='mr-5 flex max-h-44 flex-col items-center justify-between gap-1'>
      <div style={{ opacity: isCloseToTop ? 0 : 1 }}>
        <PlayIcon size={10} color='#666' title='down' className='-rotate-90' />
      </div>

      <div onScroll={handleElementScroll} className='no-scrollbar max-h-44 overflow-y-auto px-5'>
        <div className='flex flex-col items-start justify-start '>
          {pieChartData.map(({ name, color }, index) => (
            <div
              key={index}
              className='flex items-center justify-start gap-1'
              onMouseEnter={() =>
                setSlicesOverrides((prevArr) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: true,
                    // color: 'black'
                  }),
                )
              }
              onMouseLeave={() =>
                setSlicesOverrides((prevArr) =>
                  prevArr.with(index, {
                    ...prevArr[index],
                    active: false,
                    // color: undefined,
                  }),
                )
              }
            >
              <div className='relative top-px size-2' style={{ backgroundColor: color }} />
              <div className='cursor-default whitespace-nowrap' style={{ color }}>
                {formatLabel(name)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ opacity: isCloseToBottom ? 0 : 1 }}>
        <PlayIcon size={10} color='#666' title='down' className='rotate-90' />
      </div>
    </div>
  );
}
