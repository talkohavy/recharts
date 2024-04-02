/**
 * @param {{
 *   currentSliceOverride: any,
 *   path: string,
 *   color: string
 * }} props
 */
export default function PieSlice(props) {
  const { currentSliceOverride, path, color } = props;
  // eslint-disable-next-line
  const { active, ...restOfOverrideProps } = currentSliceOverride;

  return (
    <path fill={color} d={path} strokeWidth='4' stroke='white' className='duration-200' {...restOfOverrideProps} />
  );
}
