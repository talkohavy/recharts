import type { FC, ReactNode } from 'react';

export type AxisDomain =
  | string[]
  | number[]
  | [AxisDomainItem, AxisDomainItem]
  | (([dataMin, dataMax]: [number, number], allowDataOverflow: boolean) => [number, number]);

export type AxisLabel =
  | string
  | {
      value: string;
      angle?: number;
      dy?: number;
      dx?: number;
      position?:
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
    };

export type BarClickEventProps = {
  background: { x: number; y: number; width: number; height: number };
  fill: string;
  height: number;
  payload: { x: string | number };
  tooltipPayload: Array<any>;
  tooltipPosition: { x: number; y: number };
  value: number;
  width: number;
  x: number;
  y: number;
};

/**
 * @description
 * The below props are shared props between a LineChart & a BarChart.
 * They do not fit for PieChart.
 */
export type BaseChartProps = {
  showGrid?: boolean | { showHorizontalLines?: boolean; showVerticalLines?: boolean };
  showLegend?: boolean;
  showZoomSlider?: boolean;
  gridColor?: string;
  xLabel?: string;
  xRotateAngle?: number;
  xTickColor?: string;
  xHide?: boolean;
  yLabel?: string;
  yTickColor?: string;
  yTickSuffix?: string;
  yHide?: boolean;
  referenceLines?: Array<ReferenceLine>;
  className?: string;
  style?: any;
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

export type SingleBar = {
  /**
   * _name_ must be unique! Do not leave as an empty string.
   */
  name: string;
  data: Array<{ x: number | string; y: number; color?: string }>;
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

export type SingleLine = {
  name: string;
  color?: string;
  lineWidth?: number;
  curveType?: CurveType;
  data: Array<{
    x: number | string;
    y: number;
    showDotValue?: boolean;
    dot?: { r?: number; fill?: string; stroke?: string };
  }>;
  isDashed?: boolean;
  showDotValues?: boolean;
  dots?: { r: number };
  hide?: boolean;
};

export type SinglePie = {
  name: string;
  value: number;
  color?: string;
};
