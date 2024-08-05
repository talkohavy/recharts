import { formatLabel } from './helpers';
import type { TooltipProps } from 'recharts';

type CustomTooltipProps = TooltipProps<number | string | Array<number | string>, number | string> & {
  ySuffix: string;
  xValueFormatter: (value: any) => string;
};

export default function CustomTooltip(props: CustomTooltipProps) {
  const { active, payload, label, separator, xValueFormatter, ySuffix } = props;

  if (active && payload && payload.length) {
    const formattedXLabel = xValueFormatter(label);

    return (
      <div className='whitespace-nowrap rounded-md border border-neutral-400 bg-white bg-opacity-90 p-2.5 pb-3'>
        <p className='font-bold'>{formattedXLabel}</p>
        <ul className='pt-1 text-blue-600'>
          {payload.map(({ name, value, color, unit }, index) => {
            const formattedValue = formatLabel(value);

            return (
              <li key={index} style={{ color }}>
                <span>{name}</span>
                <span>{separator}</span>
                <span>{formattedValue}</span>
                <span>{unit ?? ySuffix}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
}
