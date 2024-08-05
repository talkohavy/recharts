import type { BarSeries, LineSeries } from '../types';

function getNamesObject(data: Array<BarSeries> | Array<LineSeries>, defaultValue: any = null) {
  const obj: Record<string, any> = {};

  data.forEach(({ name }) => (obj[name] = defaultValue));

  return obj;
}

export { getNamesObject };
