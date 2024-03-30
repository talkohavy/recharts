export default function CustomPieLegendLabelFormatter(value, entry) {
  const { color } = entry;

  return <span style={{ color }}>{value}</span>;
}
