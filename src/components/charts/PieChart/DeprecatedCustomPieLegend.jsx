import clsx from 'clsx';

const SIZE = 32;

/**
 * @param {import('recharts').LegendProps} props
 */
export default function DeprecatedCustomPieLegend(props) {
  console.log('props we did it!', props);
  const { payload, iconSize, layout, formatter: parentFormatter, inactiveColor } = props;

  const viewBox = { x: 0, y: 0, width: SIZE, height: SIZE };

  const itemStyle = {
    display: layout === 'horizontal' ? 'inline-block' : 'block',
    marginRight: 10,
  };

  const svgStyle = { display: 'inline-block', verticalAlign: 'middle', marginRight: 4 };

  return payload.map((item, i) => {
    const { formatter: itemFormatter, value, inactive, type, color: itemColor } = item;

    const finalFormatter = itemFormatter || parentFormatter;
    const className = clsx({
      'recharts-legend-item': true,
      [`legend-item-${i}`]: true,
      inactive,
    });

    if (type === 'none') return null;

    const color = inactive ? inactiveColor : itemColor;

    return (
      <li
        className={className}
        style={itemStyle}
        key={`legend-item-${i}`}
        // {...adaptEventsOfChild(this.props, entry, i)}
      >
        <svg
          width={iconSize}
          height={iconSize}
          style={svgStyle}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        >
          <title>title</title>
          <desc>desc</desc>
          <path stroke='none' fill={color} d={`M0,${SIZE / 8}h${SIZE}v${(SIZE * 3) / 4}h${-SIZE}z`} />
        </svg>

        <span style={{ color }}>{finalFormatter ? finalFormatter(value, item, i) : value}</span>
      </li>
    );
  });
}
