/**
 * @typedef {import('../../components/charts/types').LineSeries} LineSeries
 */

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
export const seriesLines = [
  {
    name: 'work',
    data: data.map((item) => ({ x: new Date(item.datetime).getTime(), y: item.metric })),
  },
];

// function generateXAxisValues() {
//   const dataPointsCount = Math.floor(Math.random() * 200);

//   /** @type {LineSeriesData} */
//   const dataSets = [];

//   const oneDay = 1000 * 60 * 60 * 24;
//   const addGap = oneDay * 30;

//   for (let i = 0; i < dataPointsCount; i++) {
//     const shouldAddGap = i > dataPointsCount / 2;

//     const pointWithXValue = { x: Date.now() + i * oneDay + (shouldAddGap ? addGap : 0) };

//     // @ts-ignore
//     dataSets.push(pointWithXValue);
//   }

//   return dataSets;
// }

// function generateDataForSeries(xAxisPoints) {
//   const dataForSeries = xAxisPoints.map((item) => ({ ...item }));

//   dataForSeries.forEach((p, index) => {
//     if (index === dataForSeries.length / 2) {
//       p.y = null;
//     } else {
//       p.y = 10 + Math.floor(Math.random() * 200);
//     }
//   });

//   return dataForSeries;
// }

// const xAxisValues = generateXAxisValues();

// /** @type {Array<LineSeries>} */
// const lines = [
//   {
//     name: 'National GDP',
//     curveType: 'monotone',
//     color: COLORS[0],
//     unit: 'cm',
//     showValues: false,
//     data: generateDataForSeries(xAxisValues),
//   },
//   {
//     name: 'Dark Matter',
//     curveType: 'monotone',
//     color: COLORS[1],
//     unit: 'km',
//     showValues: false,
//     data: generateDataForSeries(xAxisValues),
//   },
// ];
