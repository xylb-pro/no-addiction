const db = require('../db');

async function getAllTimers(userId) {
  try {
    const timers = await db.getAllTimers(userId);
    return timers.rows;
  } catch (error) {
    throw new Error('Get all timers server error');
  }
}

async function getCurrentTimer(userId) {
  try {
    const currentTimer = await db.getCurrentTimer(userId);

    if (currentTimer.rows.length === 0) {
      return { timerId: -1, beginDate: null, endDate: null };
    }

    const {
      _id: timerId,
      begin_date: beginDate,
      end_date: endDate,
    } = currentTimer.rows[0];

    return { timerId, beginDate, endDate };
  } catch (error) {
    throw new Error('Get current timer server error');
  }
}

const getInAddiction = async (userId) => {
  try {
    const timer = await db.getCurrentTimer(userId);
    if (!timer.rows.length) {
      return { inAddiction: true };
    } else return { inAddiction: false };
  } catch (error) {
    throw new Error('Cannot get inAddiction status');
  }
};

async function getLastTimer(userId) {
  try {
    const lastTimer = await db.getLastTimer(userId);
    return lastTimer.rows;
  } catch (error) {
    throw new Error('Get last timer error');
  }
}

const updateCurrentTimerEndDate = async (userId, id, date) => {
  try {
    const updateResult = await db.updateCurrentTimerEndDate(userId, id, date);
    return updateResult.rowCount;
  } catch (error) {
    throw new Error(
      `Can not update current timer. Timer id: ${id}. Date: ${date}
      Sql error: ${error}`,
    );
  }
};

const getRecordsListWithDuration = async (userId, categoryId, limit) => {
  try {
    let result = await db.getRecordsListWithDuration(userId, categoryId, limit);
    result = result.rows.map((el) => {
      return {
        recordId: el._id,
        beginDate: el.begin_date,
        endDate: el.end_date,
      };
    });

    return result;
  } catch (error) {
    throw new Error(
      `Can not get records list
      Sql error: ${error}`,
    );
  }
};

const createNewCurrentDate = async (userId, beginDate, categoryId) => {
  try {
    const queryResult = await db.createNewDate(
      userId,
      beginDate,
      null,
      categoryId,
    );
    return queryResult;
  } catch (error) {
    throw new Error(
      `Can not create new current timer. userId: ${userId}; beginDate: ${beginDate}; categoryId: ${categoryId}
      Sql error: ${error}`,
    );
  }
};

/**
 * Delete timer by id service
 * @param {number} timerId
 */
const deleteTimerById = async (userId, timerId) => {
  try {
    const queryResult = await db.deleteTimerById(userId, timerId);

    return queryResult.rowCount;
  } catch (error) {
    throw new Error(`Cant delete timer: ${timerId}
    SQL error: ${error}`);
  }
};

module.exports = {
  getAllTimers,
  getCurrentTimer,
  getLastTimer,
  getInAddiction,
  updateCurrentTimerEndDate,
  createNewCurrentDate,
  getRecordsListWithDuration,
  deleteTimerById,
};
