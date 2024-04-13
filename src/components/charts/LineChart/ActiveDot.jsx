export default function ActiveDot(props) {
  const { cx, cy, data, index, fill } = props;

  const dot = data[index]?.dot;
  const dotProps = {
    r: dot?.r ?? 8,
    stroke: dot?.stroke ?? 'white',
    fill: dot?.fill ?? fill,
  };

  return (
    <svg>
      <circle cx={cx} cy={cy} {...dotProps} />
    </svg>
  );
}
