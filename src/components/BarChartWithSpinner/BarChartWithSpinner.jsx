import BarChart from '../charts/BarChart';
import ChartSpinner from '../charts/ChartSpinner';

/**
 * @param {import('../charts/types').BarChartProps & {isLoading: boolean}} props
 */
export default function BarChartWithSpinner(props) {
  const { isLoading, ...restOfProps } = props;

  return (
    <div className='relative size-full'>
      {isLoading && <ChartSpinner />}

      <BarChart {...restOfProps} />
    </div>
  );
}
