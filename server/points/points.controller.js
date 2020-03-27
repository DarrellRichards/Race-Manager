const PointsModel = require('./points.model');

class PointsController {
  constructor() {
    this.model = PointsModel;
  }

  async obtainSeriesPoints(req, res) {
    // const { series, type } = req.query;
    // const seriesResults = await this.results.find().populate({
    //   path: 'series',
    //   match: {
    //     _id: series,
    //   },
    // });

    // const filtered = seriesResults.filter(result => result.series);
    // for (let index = 0; index < filtered.length; index += 1) {
    //   const result = filtered[index];

    // }
    return res.status(200).json({ message: 'Welp we found something' });
  }

  async addSeriesPoints(series, data, season) {
    const points = {
      series,
      season,
      drivers: [],
    };
    const currentPoints = await this.model.find().populate({
      path: 'series',
      match: {
        _id: series,
      },
    });
    console.log(currentPoints.length)
    if (currentPoints.length < 1) {
      // Create a new Points System.
      data.drivers.map((driver) => {
        const info = {
          name: driver.name,
          starts: 1,
          wins: 0,
          inc: driver.inc,
          top_five: 0,
          top_ten: 0,
          laps: driver.laps_comp,
          laps_lead: driver.laps_lead,
          points: driver.points,
          bonus_points: driver.bonus_points,
          total_points: driver.total_points,
        };
        if (Number(driver.finish_pos) === 1) info.wins = 1;
        if (Number(driver.finish_pos) <= 5) info.top_five = 1;
        if (Number(driver.finish_pos) <= 10) info.top_ten = 1;
        return points.drivers.push(info);
      });
      const savedPoints = await this.model.create(points);
      return Promise.resolve(savedPoints);
    }

    const foundPoints = currentPoints.filter(result => result.series);
    data.drivers.map(driver => {
        const foundDriver = foundPoints[0].drivers.filter(function (d) { return d.name === driver.name; });
        if (foundDriver.length > 0) {
            foundDriver[0].total_points =  foundDriver[0].total_points + driver.total_points;
            foundDriver[0].bonus_points =  foundDriver[0].bonus_points + driver.bonus_points;
            foundDriver[0].starts = foundDriver[0].starts + 1;
            foundDriver[0].inc = foundDriver[0].inc + driver.inc;
            foundDriver[0].laps_comp = foundDriver[0].laps_comp + driver.laps_comp;
            foundDriver[0].laps_lead = foundDriver[0].laps_lead + driver.laps_lead;
            if (Number(driver.finish_pos) === 1) foundDriver[0].wins += 1;
            if (Number(driver.finish_pos)<= 5) foundDriver[0].top_five += 1;
            if (Number(driver.finish_pos) <= 10) foundDriver[0].top_ten + 1;
        } else {
            const info = {
                postion: driver.finish_pos,
                change: 0,
                name: driver.name,
                starts: 1,
                wins: 0,
                inc: driver.inc,
                top_five: 0,
                top_ten: 0,
                laps: driver.laps_comp,
                laps_lead: driver.laps_lead,
                bonus_points: driver.bonus_points,
                total_points: driver.total_points,
            };
            if (isNaN(driver.total_points)) info.total_points = 0;
            if (isNaN(driver.bonus_points)) info.bonus_points = 0;
            if (Number(driver.finish_pos) === 1) info.wins = 1;
            if (Number(driver.finish_pos) <= 5) info.top_five = 1;
            if (Number(driver.finish_pos) <= 10) info.top_ten = 1;
            foundPoints[0].drivers.push(info);
        }
    });
    return Promise.resolve(await this.model.findOneAndUpdate({_id: foundPoints[0]._id}, {"$set": {drivers: foundPoints[0].drivers}}))
  }
}


module.exports = new PointsController();
