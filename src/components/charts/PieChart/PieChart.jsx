import { useState } from 'react';
import { Cell, Legend, Pie, PieChart as PieChartBase, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS, PIE_CHART } from './constants';
import CustomActiveShapeShort from './CustomActiveShapeShort';
import CustomPieLabel from './CustomPieLabel';
import CustomPieTooltip from './CustomPieTooltip';

/** @typedef {import('../types').SinglePie} SinglePie */

/**
 * @param {{
 *   data: Array<SinglePie>
 *   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *   showLegend?: boolean,
 *   showTooltip?: boolean,
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function PieChart(props) {
  const { data, size = 'sm', showLegend = true, showTooltip = false, className, style } = props;

  const [isAnimationActive, setIsAnimationActive] = useState(true);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChartBase className={className} style={style}>
        <Tooltip content={CustomPieTooltip} active={showTooltip} />

        {showLegend && <Legend layout='vertical' verticalAlign='middle' align='right' />}

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
          activeShape={CustomActiveShapeShort}
          label={CustomPieLabel}
          dataKey='value'
          fill='#8884d8'
          isAnimationActive={isAnimationActive}
          onAnimationEnd={() => setIsAnimationActive(() => false)}
          // label // <--- i'm using CustomPieLabel instead, which is a custom label renderer.
          // activeIndex={activeIndex} // <--- CustomActiveShape takes care of that already.
          // onMouseEnter={onHoverPie}// <--- CustomActiveShape takes care of that already.
        >
          {data.map((_entry, piePieceIndex) => (
            <Cell key={`cell-${piePieceIndex}`} fill={COLORS[piePieceIndex % COLORS.length]} />
          ))}
        </Pie>
      </PieChartBase>
    </ResponsiveContainer>
  );
}
