const RADIAN = Math.PI / 180;

export default function CustomPieLabel(props) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central' className='pointer-events-none'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}
