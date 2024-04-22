import type { FC, ReactNode } from 'react';

export type AxisLabelPosition =
  | 'insideLeft'
  | 'insideRight'
  | 'insideTop'
  | 'insideBottom'
  | 'insideTopLeft'
  | 'insideTopRight'
  | 'insideBottomLeft'
  | 'insideBottomRight'
  | 'left'
  | 'right'
  | 'middle'
  | 'bottom'
  | 'centerBottom'
  | 'centerTop'
  | 'center'
  | 'insideEnd'
  | 'insideStart';

export type BarChartProps = BaseChartProps & {
  bars: Array<BarSeries>;
  onClickBar?: (props: BarClickEventProps & { name: string; barTypeIndex: number }) => void;
  /**
   * Every Bar within the BarChart has an ID which is a string comprised of '[bar name]-[x value]'.
   * @example
   * const bars = [{ name: 'hello', data: [{x: 'Israel', y: 140}, x: 'France', y: 120]}];
   * // The barIds are: 'hello-Israel' & 'hello-France'
   */
  activeBarId?: string;
};

export type BarClickEventProps = {
  payload: { x: string | number };
  value: number;
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  background: { x: number; y: number; width: number; height: number };
  tooltipPayload: Array<any>;
  tooltipPosition: { x: number; y: number };
};

export type BarSeries = {
  /**
   * _name_ must be unique! Do not leave as an empty string.
   */
  name: string;
  data: BarSeriesData;
  color?: string;
  barBorderColor?: string;
  /**
   * a suffix that will be added to the tooltip.
   */
  unit?: string;
  /**
   * Give 2 bars (or more) the same stackId to have them stacked together, one on top of the other, in the same bar.
   */
  stackId?: string;
};

export type BarSeriesData = Array<{ x: number | string; y: number; color?: string }>;

/**
 * @description
 * The below props are shared props between a LineChart & a BarChart.
 * They do not fit for PieChart.
 */
export type BaseChartProps = {
  settings?: ChartSettings;
  /**
   * Use 'category' when your xAxis is made of *words*. i.e. ['Cars', 'Ships', 'Planes', 'Other'].
   *
   * Use 'number' when your xAxis is made of *numbers*, which can contain gaps. i.e. [1,2,3,6]. In this example, recharts will take care of properly spacing 3 and 6, while if using 'category' the space between them would be 1.
   *
   * Use 'datetime' when your xAxis is time-based. xAxis values MUST BE of unix timestamp.
   * @default 'category'
   */
  type?: 'category' | 'number' | 'datetime';
  yHide?: boolean;
  referenceLines?: Array<ReferenceLine>;
  className?: string;
  style?: any;
};

export type ChartSettings = {
  general?: {
    /**
     * According to recharts, if you leave this as undefined, it would default to `true` in CSR, and to `false` in SSR.
     * @default undefined
     */
    isAnimationActive?: boolean;
    /**
     * In case of a LineChart, shows values for all lines, above the dots.
     * In case of a BarChart, shows values for all bars, inside the bar.
     * @default false
     */
    showValues?: boolean;
  };
  xAxis?: {
    /**
     * @default true
     */
    show?: boolean;
    label?: string;
    /**
     * The color of the tick's value.
     * @default '#666'
     */
    color?: string;
    /**
     * The angle of the tick's value.
     * @default 0
     */
    tickAngle?: number;
    tickFormatter?: (value: any) => string;
    // tickSuffix: string;
  };
  yAxis?: {
    /**
     * @default true
     */
    show?: boolean;
    label?: string;
    tickColor?: string;
    tickSuffix?: string;
    tickFormatter?: (value: any) => string;
  };
  grid?: {
    /**
     * @default true
     */
    show?: boolean;
    /**
     * @default false
     */
    showHorizontalLines?: boolean;
    /**
     * @default false
     */
    showVerticalLines?: boolean;
    strokeDasharray?: string;
    color?: string;
  };
  zoomSlider?: {
    /**
     * @default false
     */
    show?: boolean;
    /**
     * @default false
     */
    showPreviewInSlider?: boolean;
  };
  legend?: {
    /**
     * @default true
     */
    show?: boolean;
    nameFormatter?: (value: any) => string;
  };
  tooltip?: {
    /**
     * @default true
     */
    show?: boolean;
    xValueFormatter?: (value: any) => string;
    yValueFormatter?: (value: any) => string;
  };
  lines?: {
    /**
     * Whether to connect a graph line across null points.
     * @default false
     */
    connectNulls?: boolean;
  };
};

export type CurveType =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bumpX'
  | 'bumpY'
  | 'bump'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

export type LineChartProps = BaseChartProps & {
  lines: Array<LineSeries>;
};

export type LineSeries = {
  name: string;
  color?: string;
  lineWidth?: number;
  curveType?: CurveType;
  data: LineSeriesData;
  isDashed?: boolean;
  showValues?: boolean;
  dots?: {
    /**
     * A dot's radius.
     * @default 3
     */
    r: number;
  };
  hide?: boolean;
};

export type LineSeriesData = Array<{
  x: number | string;
  y: number;
  showValue?: boolean;
  dot?: { r?: number; fill?: string; stroke?: string };
}>;

export type PieChartDrawData = {
  name: string;
  value: number;
  percent: number;
  percentFormatted: number;
  color: string;
  angle: number;
  startAngle: number;
  endAngle: number;
  path: string;
  externalArcPath: string;
  middleDirection: { xDirection: number; yDirection: number };
  arcStartPoint: { x: number; y: number };
  arcEndPoint: { x: number; y: number };
};

export type ReferenceLine = {
  x?: number | string;
  y?: number;
  label?: string;
  lineWidth?: number;
  lineColor?: string;
  isDashed?: boolean;
};

export type SinglePie = {
  name: string;
  value: number;
  color?: string;
};
