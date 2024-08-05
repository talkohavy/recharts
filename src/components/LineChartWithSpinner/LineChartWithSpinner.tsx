import ChartSpinner from '../charts/ChartSpinner';
import LineChart from '../charts/LineChart';

/**
 * @param {import('../charts/types').LineChartProps & {isLoading?: boolean}} props
 */
export default function LineChartWithSpinner(props) {
  const { isLoading, ...restOfProps } = props;

  return (
    <div className='relative size-full'>
      {isLoading && <ChartSpinner />}

      <LineChart {...restOfProps} />
    </div>
  );
}
