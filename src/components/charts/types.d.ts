import type { FC, ReactNode } from 'react';

export type AxisDomain =
  | string[]
  | number[]
  | [AxisDomainItem, AxisDomainItem]
  | (([dataMin, dataMax]: [number, number], allowDataOverflow: boolean) => [number, number]);

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

export type ReferenceLine = {
  x?: number | string;
  y?: number;
  label: string;
  lineWidth?: number;
  lineColor?: string;
  isDashed?: boolean;
};

export type SingleBar = {
  name: string;
  color?: string;
  borderColor?: string;
  data: Array<{ x: number | string; y: number; color?: string }>;
  unit?: string;
  stackId?: string;
};

export type SingleLine = {
  name: string;
  color?: string;
  lineWidth?: number;
  curveType?: CurveType;
  data: Array<{ x: number | string; y: number }>;
  isDashed?: boolean;
  dot?: any;
};
