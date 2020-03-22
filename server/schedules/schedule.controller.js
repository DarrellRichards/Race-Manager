const ScheduleModel = require('./schedules.model');

class ScheduleController {
  constructor() {
    this.model = ScheduleModel;
  }

  async fetchSchedule(req, res) {
    if (req.query.series) {
      const seriesSchedule = await this.model.find().populate({
        path: 'series',
        match: {
          _id: req.query.series,
        },
      });
      const schedules = seriesSchedule.filter(schedule => schedule.series);
      return res.status(200).json({ schedules });
    }
    if (req.query.season) {
      const seriesSchedule = await this.model.find().populate({
        path: 'series',
        match: {
          season: req.query.season,
        },
      });
      const schedules = seriesSchedule.filter(schedule => schedule.series);
      return res.status(200).json({ schedules });
    }
    const schedules = await this.model.find().populate('series');
    return res.status(200).json({ schedules });
  }

  async deleteSchedule(req, res) {
    await this.model.remove({ _id: req.params.id });
    return res.status(200).json({ message: 'Successfully deleted schedule' });
  }

  async createSchedule(req, res) {
    const schedule = await this.model.create(req.body);
    return res.status(201).json({ schedule });
  }
}

module.exports = new ScheduleController();
