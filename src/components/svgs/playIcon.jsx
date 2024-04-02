/**
 * @param {{
 *    size?: number,
 *    color?: string,
 *    title?: string,
 *    className?: string,
 * }} props
 */
export default function PlayIcon({ size = 18, color = 'black', title = 'play icon', className }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox='0 0 7.4142 10.802'
      fill={color}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <title>{title}</title>

      <path d='m7.0448 4.6248c0.4925 0.40019 0.4925 1.152 0 1.5522l-5.4142 4.399c-0.65351 0.531-1.6306 0.066-1.6306-0.7761v-8.798c0-0.84203 0.97708-1.3071 1.6306-0.77611z' />
    </svg>
  );
}
