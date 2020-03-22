const csv = require('fast-csv');
const fs = require('fs');

const ResultsModel = require('./results.model');
const PointsController = require('../points/points.controller');
const SeriesModel = require('../series/series.model');

class ResultsController {
  constructor() {
    this.data = {
      start_time: '',
      track: '',
      series: '',
      schedule: '',
      drivers: [],
    };
    this.model = ResultsModel;
    this.series = SeriesModel;
    this.PointsController = PointsController;
  }

  async fetchResults(req, res) {
    if (req.query.series) {
      const resultSchedule = await this.model.find().populate({
        path: 'series',
        match: {
          _id: req.query.series,
        },
      });
      const results = resultSchedule.filter(result => result.series);
      return res.status(200).json({ results });
    }
    const results = await this.model.find({}).populate('schedule').populate('series');
    return res.status(200).json({ results });
  }

  async processResults(req, res) {
    let count = 0;
    fs.createReadStream(req.file.path)
      .pipe(csv.parse())
      .on('error', error => console.error(error))
      .on('data', (row) => {
        this.processData(req, row, count);
        count += 1;
      })
      .on('end', () => this.saveData(req, res));
  }

  async saveData(req, res) {
    const { series, schedule } = req.body;
    this.data.series = series;
    this.data.schedule = schedule;
    await this.updatePoints();
    const updatedPoints = await this.PointsController.addSeriesPoints(series, this.data);
    const results = await this.model.create(this.data);
    fs.unlinkSync(req.file.path);
    return res.status(201).json({ results, updatedPoints });
  }

  async updatePoints() {
    const { series, drivers } = this.data;
    const currentSeries = await this.series.find({ _id: series });
    const ledMost = drivers.reduce((prev, current) => ((prev.laps_led > current.laps_led) ? prev : current));
    for (let index = 0; index < drivers.length; index += 1) {
      let bonusPoints = 0;
      const element = drivers[index];
      const seriesPoints = currentSeries[0].driver_points[index];
      if (ledMost.name === element.name) {
        bonusPoints += currentSeries[0].driver_most_laps;
      }
      element.points = seriesPoints;
      element.bonus_points = bonusPoints;
      element.total_points = seriesPoints + bonusPoints;
    }
    Promise.resolve(drivers);
  }

  // eslint-disable-next-line class-methods-use-this
  async processData(req, row, count) {
    if (count === 1) {
      // eslint-disable-next-line prefer-destructuring
      this.data.start_time = row[0];
      // eslint-disable-next-line prefer-destructuring
      this.data.track = row[1];
    }

    if (count > 3) {
      const driver = {
        finish_pos: row[0],
        start_pos: row[8],
        name: row[7],
        int: row[12],
        qual_time: row[14],
        fast_lap_time: row[16],
        laps_comp: row[18],
        car_number: row[9],
        laps_led: row[13],
        avg_lap_time: row[15],
        fast_lap: row[17],
        inc: row[19],
      };
      this.data.drivers.push(driver);
    }
  }
}


module.exports = new ResultsController();
