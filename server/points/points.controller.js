// const PointsModel = require('./points.model');

// class PointsController {
//   constructor() {
//     this.model = PointsModel;
//   }

//   async obtainSeriesPoints(req, res) {
//     // const { series, type } = req.query;
//     // const seriesResults = await this.results.find().populate({
//     //   path: 'series',
//     //   match: {
//     //     _id: series,
//     //   },
//     // });

//     // const filtered = seriesResults.filter(result => result.series);
//     // for (let index = 0; index < filtered.length; index += 1) {
//     //   const result = filtered[index];

//     // }
//     return res.status(200).json({ message: 'Welp we found something' });
//   }

//   async addSeriesPoints(series, data) {
//     const points = {
//       series,
//       drivers: [],
//     };
//     const currentPoints = await this.model.find().populate({
//       path: 'series',
//       match: {
//         _id: series,
//       },
//     });
//     if (currentPoints.length < 1) {
//       // Create a new Points System.
//       data.drivers.map((driver) => {
//         const info = {
//           postion: driver.finish_pos,
//           change: 0,
//           name: driver.name,
//           starts: 1,
//           wins: 0,
//           top_five: 0,
//           top_ten: 0,
//           laps: driver.laps_comp,
//           points: driver.points,
//           bonus_points: driver.bonus_points,
//           total_points: driver.total_points,
//         };
//         if (driver.finish_pos === 1) info.wins = 1;
//         if (driver.finish_pos <= 5) info.top_five = 1;
//         if (driver.finish_pos <= 10) info.top_ten = 1;
//         return points.drivers.push(info);
//       });

//       const savedPoints = await this.model.create(points);
//       return Promise.resolve(savedPoints);
//     }

//     const foundPoints = currentPoints.filter(result => result.series);
//     for (let index = 0; index < data.drivers.length; index += 1) {
//       const currentDriver = data.drivers[index];
//       const updatedDriver = foundPoints[0].driver[index];
//       const info = {
//         postion: updatedDriver.finish_pos,
//         change: 0,
//         name: currentDriver.name,
//         starts: 1,
//         wins: 0,
//         top_five: 0,
//         top_ten: 0,
//         laps: currentDriver.laps_comp,
//         points: currentDriver.points,
//         bonus_points: currentDriver.bonus_points,
//         total_points: currentDriver.total_points,
//       };
//       if (driver.finish_pos === 1) info.wins = 1;
//       if (driver.finish_pos <= 5) info.top_five = 1;
//       if (driver.finish_pos <= 10) info.top_ten = 1;
//       return points.drivers.push(info);

//     }
//     console.log(foundPoints[0]);
//     Promise.reject(new Error('Wweee'));
//   }
// }


// module.exports = new PointsController();
