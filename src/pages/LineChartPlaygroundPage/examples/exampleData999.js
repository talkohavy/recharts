/**
 * @typedef {import('../../../components/charts/types').LineSeries} LineSeries
 */

// data from work
const data = [
  { datetime: '2024-04-05 05:00:00', metric: 12.9 },
  { datetime: '2024-04-05 05:30:00', metric: 12.9 },
  { datetime: '2024-04-05 06:00:00', metric: 12.9 },
  { datetime: '2024-04-05 06:30:00', metric: 12.9 },
  { datetime: '2024-04-05 07:00:00', metric: 12.9 },
  { datetime: '2024-04-05 07:30:00', metric: 12.9 },
  { datetime: '2024-04-05 08:00:00', metric: 12.9 },
  { datetime: '2024-04-05 08:30:00', metric: 12.9 },
  { datetime: '2024-04-05 09:00:00', metric: 12.9 },
  { datetime: '2024-04-05 09:30:00', metric: 12.9 },
  { datetime: '2024-04-05 10:00:00', metric: 12.9 },
  { datetime: '2024-04-05 10:30:00', metric: 12.9 },
  { datetime: '2024-04-05 11:00:00', metric: 12.9 },
  { datetime: '2024-04-05 11:30:00', metric: 12.9 },
  { datetime: '2024-04-05 12:00:00', metric: 12.9 },
  { datetime: '2024-04-05 12:30:00', metric: 69.25 },
  { datetime: '2024-04-05 13:00:00', metric: 12.9 },
  { datetime: '2024-04-05 13:30:00', metric: 12.9 },
  { datetime: '2024-04-05 14:00:00', metric: 62.2 },
  { datetime: '2024-04-05 14:30:00', metric: 49.233333333333334 },
  { datetime: '2024-04-05 15:00:00', metric: 51.0 },
  { datetime: '2024-04-05 15:30:00', metric: 50.7 },
  { datetime: '2024-04-05 16:00:00', metric: 50.6 },
  { datetime: '2024-04-05 16:30:00', metric: 50.43333333333333 },
  { datetime: '2024-04-05 17:00:00', metric: 49.96666666666667 },
  { datetime: '2024-04-05 17:30:00', metric: 49.93333333333333 },
  { datetime: '2024-04-05 18:00:00', metric: 50.03333333333333 },
  { datetime: '2024-04-05 18:30:00', metric: 50.0 },
  { datetime: '2024-04-05 19:00:00', metric: 50.0 },
  { datetime: '2024-04-05 19:30:00', metric: 50.0 },
  { datetime: '2024-04-05 20:00:00', metric: 49.93333333333333 },
];

/**
 * @type {Array<LineSeries>}
 */
// Example 5: 1 Line, datetime type
const example5 = [
  {
    name: 'work',
    data: data.map((item) => ({ x: new Date(item.datetime).getTime(), y: item.metric })),
  },
];

export { example5 };
