import clsx from 'clsx';
import { formatLabel } from '../helpers';
import styles from './CustomTooltip.module.scss';
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
      <div className={clsx('chart-custom-tooltip', styles.customTooltip)}>
        <p className={styles.customTooltipHeader}>{formattedXLabel}</p>

        <ul className={styles.customTooltipItemsList}>
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
