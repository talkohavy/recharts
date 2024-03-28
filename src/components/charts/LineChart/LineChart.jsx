import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChartBase,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/**
 * @typedef {import('../types').SingleLine} SingleLine
 * @typedef {import('../types').ReferenceLine} ReferenceLine
 */

/**
 * @param {{
 *   lines: Array<SingleLine>,
 *   referenceLines?: Array<ReferenceLine>,
 *   showGrid?: boolean,
 *   showLegend?: boolean,
 *   xAxisType?: 'number' | 'category',
 *   xRotateAngle?: number,
 *   xDown?: number,
 *   xHeight?: number,
 *   xPadding?: {left?: number, right?: number},
 *   gridColor?: string,
 *   activeDotRadius?: number,
 *   activeDotColor?: string,
 *   margin?: { top?: number, right?: number, left?: number, bottom?: number }
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function LineChart(props) {
  const {
    lines,
    referenceLines,
    showGrid,
    showLegend,
    xAxisType,
    xRotateAngle,
    xDown,
    xHeight,
    xPadding,
    activeDotRadius,
    activeDotColor,
    gridColor = '#ddd',
    margin,
    className,
    style,
  } = props;

  const activeDot = { r: activeDotRadius ?? 8 };
  if (activeDotColor) {
    activeDot.stroke = activeDotColor;
    activeDot.fill = activeDotColor;
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChartBase margin={margin} className={className} style={style}>
        {/* MUST come before XAxis & YAxis */}
        {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray='5 5' />}

        {/* 1. tick        - XAxis can have tick={tickRenderFunction} */}
        {/* 2. domain      - domain={[0, 'dataMax + 100']} */}
        <XAxis
          dataKey='x'
          stroke='#666'
          type={xAxisType ?? 'category'}
          angle={xRotateAngle}
          dy={xDown}
          padding={xPadding}
          xAxisId='bottom'
          height={xHeight}
        />
        <YAxis dataKey='y' stroke='#666' yAxisId='left' />

        <Tooltip />

        {showLegend && <Legend />}

        {/* <ReferenceLine x='Page C' stroke='red' label='Max PV PAGE' /> */}
        {referenceLines?.map(({ x, y, label, lineWidth, lineColor, isDashed }, index) => {
          const referenceLineProps = {
            x,
            y,
            label,
            stroke: lineColor ?? '#666',
            strokeWidth: lineWidth ?? 1,
            xAxisId: 'bottom',
            yAxisId: 'left',
          };

          if (isDashed) referenceLineProps.strokeDasharray = '10 10';

          return <ReferenceLine key={index} {...referenceLineProps} />;
        })}

        {lines.map(({ name, color, lineWidth, curveType, data, isDashed, dot }) => {
          const lineProps = {
            data,
            stroke: color ?? 'black',
            strokeWidth: lineWidth ?? 1,
            dataKey: 'y',
            type: curveType ?? 'linear',
            activeDot,
            yAxisId: 'left',
            xAxisId: 'bottom',
            dot,
          };

          if (isDashed) lineProps.strokeDasharray = '20 20'; // or '5 5'

          return <Line key={name} {...lineProps} />;
        })}
      </LineChartBase>
    </ResponsiveContainer>
  );
}
