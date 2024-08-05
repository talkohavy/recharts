import { useState } from 'react';
import { Cell, Legend, Pie, PieChart as PieChartBase, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS } from '../constants';
import { PIE_CHART } from './constants';
import CustomPieActiveShapeShort from './CustomPieActiveShapeShort';
import CustomPieLegendLabelFormatter from './CustomPieLegendLabelFormatter';
import CustomPiePieLabel from './CustomPiePieLabel';
import CustomPieTooltip from './CustomPieTooltip';

/** @typedef {import('../types').SinglePie} SinglePie */

/**
 * @param {{
 *   data: Array<SinglePie>
 *   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *   showLegend?: boolean,
 *   showTooltip?: boolean,
 *   activeIndex?: number,
 *   onHoverSetActive?: (props: any, index: number) => void,
 *   onHoverLegendItem?: (props?: any, index?: number) => void,
 *   pieChartCellProps?: Array<any>,
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function PieChart(props) {
  const {
    data,
    size = 'sm',
    showLegend = true,
    showTooltip = false,
    activeIndex,
    onHoverSetActive,
    onHoverLegendItem,
    pieChartCellProps,
    className,
    style,
  } = props;

  const [isAnimationActive, setIsAnimationActive] = useState(true);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChartBase className={className} style={style}>
        <Tooltip content={CustomPieTooltip} active={showTooltip} />

        {showLegend && (
          <Legend
            layout='vertical' // <--- how to align items of the legend.
            verticalAlign='middle' // <--- pin legend to top, bottom or center.
            align='right' // <--- how to align legend in reference to the pie chart.
            iconSize={14} // <--- defaults to 14
            // iconType='circle' // <--- defaults to 'rect'
            chartWidth={1000}
            formatter={CustomPieLegendLabelFormatter}
            onMouseEnter={(props, index) => {
              onHoverSetActive(props, index);
              onHoverLegendItem(props, index);
            }}
            onMouseLeave={() => {
              onHoverSetActive(null, -1);
              onHoverLegendItem(null, -1);
            }}
            // content={CustomPieLegend}
          />
        )}

        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={0}
          outerRadius={PIE_CHART[size].outerRadius}
          startAngle={180}
          endAngle={-180}
          paddingAngle={0}
          labelLine={false}
          activeShape={CustomPieActiveShapeShort}
          label={CustomPiePieLabel}
          dataKey='value'
          fill='#8884d8'
          isAnimationActive={isAnimationActive}
          onAnimationEnd={() => setIsAnimationActive(() => false)}
          // label // <--- i'm using label={CustomPieLabel} instead, which is a custom label renderer.
          activeIndex={activeIndex} // <--- At first this was commented out because CustomActiveShape took care of settings the activeIndex automatically for me. But then, I needed to handle activeIndex when hovering legend items, so this became relevant again.
          onMouseEnter={onHoverSetActive} // <--- At first this was commented out because CustomActiveShape took care of settings the activeIndex automatically for me. But then, I needed to handle activeIndex when hovering legend items, so this became relevant again.
          onMouseLeave={() => onHoverSetActive(null, -1)}
        >
          {data.map((_entry, piePieceIndex) => {
            const propsFromOutside = Array.isArray(pieChartCellProps) ? pieChartCellProps[piePieceIndex] : {};

            return (
              <Cell
                key={`cell-${piePieceIndex}`}
                fill={COLORS[piePieceIndex % COLORS.length]}
                {...propsFromOutside}
                className='duration-300'
              />
            );
          })}
        </Pie>
      </PieChartBase>
    </ResponsiveContainer>
  );
}
