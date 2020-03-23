const SeriesModel = require('./series.model');
const ScheduleModel = require('../schedules/schedules.model');
const SeasonModel = require('../seasons/seasons.model');

class SeriesController {
  constructor() {
    this.model = SeriesModel;
    this.schedule = ScheduleModel;
    this.season = SeasonModel;
  }

  async createSeries(req, res) {
    const { season, name, league } = req.body;
    try {
      const foundSeason = await this.season.create({ name: season });
      const series = await this.model.create({ name, season: foundSeason._id, league: league  });
      const updatedSeason = await this.season.findOneAndUpdate({_id: foundSeason._id}, { series: series._id })
      return res.status(201).json({ updatedSeason });
    } catch (error) {
      console.log(error);
    }
    // return res.status(201).json({ series });
  }

  async fetchSeries(req, res) {
    const { league } = req.query;
    const series = await this.model.find().populate({
      path: 'leagues',
      match: {
        league: league,
      },
    });
    // console.log(series)
    const filterSeries = series.filter(schedule => schedule.league);
    console.log(filterSeries)
    return res.status(200).json({ filterSeries });
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
