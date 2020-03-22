const SeriesModel = require('./series.model');
const ScheduleModel = require('../schedules/schedules.model');

class SeriesController {
  constructor() {
    this.model = SeriesModel;
    this.schedule = ScheduleModel;
  }

  async createSeries(req, res) {
    const series = await this.model.create(req.body);
    return res.status(201).json({ series });
  }

  async deleteSeries(req, res) {
    const { id } = req.params;
    try {
      await this.model.deleteOne({ _id: id });
      await this.schedule.deleteOne({ series: id });
      return res.status(200).json({ message: 'Successfully deleted series' });
    } catch (error) {
      return res.status(401).json({ message: 'There was a issue in deleting series' });
    }
  }
}

module.exports = new SeriesController();
