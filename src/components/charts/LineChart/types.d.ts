import type { FC, ReactNode } from 'react';

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

export type SingleLine = {
  name: string;
  color?: string;
  lineWidth?: number;
  curveType?: CurveType;
  data: Array<{ x: number | string; y: number }>;
  isDashed?: boolean;
  dot?: any;
};
