import { useState } from 'react';
import { Cell, Pie, PieChart as PieChartBase, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from '../CustomTooltip';
import CustomPieLabel from './CustomPieLabel';
import PieActiveShape from './PieActiveShape';

/** @typedef {import('../types').SinglePie} SinglePie */

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/**
 * @param {{
 *   data: Array<SinglePie>
 *   activeIndex?: number,
 *   onHoverPie?: (props: any, index: number) => void,
 *   className?: string,
 *   style?: any,
 * }} props
 */
export default function PieChart(props) {
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const { data, activeIndex, onHoverPie, className, style } = props;

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChartBase className={className} style={style}>
        <Tooltip content={CustomTooltip} />

        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={0}
          outerRadius={151}
          startAngle={180}
          endAngle={-180}
          paddingAngle={0}
          labelLine={false}
          activeShape={PieActiveShape}
          activeIndex={activeIndex}
          onMouseEnter={onHoverPie}
          label={CustomPieLabel}
          dataKey='value'
          fill='#8884d8'
          isAnimationActive={isAnimationActive}
          onAnimationEnd={() => setIsAnimationActive(() => false)}
          // label // <--- using a custom label renderer instead!
        >
          {data.map((_entry, piePieceIndex) => (
            <Cell key={`cell-${piePieceIndex}`} fill={COLORS[piePieceIndex % COLORS.length]} />
          ))}
        </Pie>
      </PieChartBase>
    </ResponsiveContainer>
  );
}
