const e = require('express');
const services = require('../services');

class TimersController {
  async getAllTimers(req, res) {
    const userId = req.user.userId;
    try {
      const timers = await services.getAllTimers(userId);
      res.json(timers);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }

  async getCurrentTimer(req, res) {
    const userId = req.user.userId;
    try {
      let timer = null;
      if (req.query.inAddiction) {
        timer = await services.getInAddiction(userId);
      } else {
        timer = await services.getCurrentTimer(userId);
      }
      res.json(timer);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }

  async getLastTimer(req, res) {
    const userId = req.user.userId;
    try {
      const timer = await services.getLastTimer(userId);
      res.json(timer);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }

  updateCurrentTimerEndDate = async (req, res) => {
    const userId = req.user.userId;
    try {
      const rows = await services.updateCurrentTimerEndDate(
        userId,
        req.body.id,
        req.body.endDate,
      );

      res.status(200).json({ message: `${rows} rows updated` });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  };

  createNewCurrentDate = async (req, res) => {
    const userId = req.user.userId;
    try {
      const { beginDate, categoryId } = req.body;
      await services.createNewCurrentDate(userId, beginDate, categoryId);

      res.status(201).json({
        message: `New current date added. {id: ${userId}, beginDate:${beginDate}, categoryId: ${categoryId}`,
      });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  };

  getRecordsList = async (req, res) => {
    const userId = req.user.userId;
    try {
      let limit = req.query.limit;
      // if (!limit) limit = 10;

      const result = await services.getRecordsListWithDuration(userId, limit);

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  };

  /**
   * Delete timer by id route controller
   * @param {} req
   * @param {} res
   */
  deleteTimerById = async (req, res) => {
    const userId = req.user.userId;
    try {
      const timerId = req.body.timerId;
      const result = await services.deleteTimerById(userId, timerId);

      res.status(200).json({
        message: `${result} timers was deleted`,
      });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  };
}

module.exports = new TimersController();
