const connectDb = require('./connect');

const getAllTimers = async (userId) => {
  const query = await connectDb.query(
    `SELECT timers._id, timers.begin_date, 
  timers.end_date, users.username, categories.name
  FROM "NoAddiction".timers
  JOIN "NoAddiction".users ON timers.user_id = users._id
  JOIN "NoAddiction".categories ON timers.category_id = categories._id WHERE timers.user_id = $1`,
    [userId],
  );

  return query;
};

const getCurrentTimer = async (userId, categoryId) => {
  const query = await connectDb.query(
    `SELECT timers._id, timers.begin_date,
  timers.end_date FROM "NoAddiction".timers WHERE timers.end_date ISNULL AND timers.user_id = $1 AND timers.category_id = $2
  ORDER BY timers.begin_date DESC`,
    [userId, categoryId],
  );

  return query;
};

const getLastTimer = async (userId) => {
  const query = await connectDb.query(
    `SELECT timers._id, begin_date, end_date, users.username, categories.name FROM "NoAddiction".timers
  JOIN "NoAddiction".users ON timers.user_id = users._id
  JOIN "NoAddiction".categories ON timers.category_id = categories._id
where end_date = (select max(end_date) from "NoAddiction".timers) AND timers.user_id = $1
`,
    [userId],
  );

  return query;
};

/**
 * Get all user records with limit
 * @param {number} limit - limit rows
 */

const getRecordsListWithDuration = async (userId, categoryId, limit = 10) => {
  const queryResult = await connectDb.query(
    `
  SELECT timers._id, timers.begin_date, timers.end_date ,timers.end_date FROM "NoAddiction".timers
  WHERE timers.end_date IS NOT NULL AND timers.user_id = $2 AND category_id = $3
  ORDER BY end_date-begin_date DESC LIMIT $1`,
    [limit, userId, categoryId],
  );

  return queryResult;
};

/**
 * Update current timer end date. Make new inAddiction status&
 * @param {number} id
 * @param {date} date
 */
const updateCurrentTimerEndDate = async (userId, id, date) => {
  const queryResult = await connectDb.query(
    `UPDATE "NoAddiction".timers set end_date=$1 where _id = $2 AND user_id = $3`,
    [date, id, userId],
  );

  return queryResult;
};

/**
 * Function to create new date in DB.
 * If you want to set current timer just make endDate === null
 * @param {number} userId
 * @param {date} beginDate
 * @param {date} endDate default value null
 * @param {number} categoryId
 */
const createNewDate = async (
  userId,
  beginDate,

  endDate = null,
  categoryId,
) => {
  const queryResult = await connectDb.query(
    `INSERT INTO "NoAddiction".timers (begin_date, end_date, user_id, category_id) VALUES ($1, $2, $3, $4)`,
    [beginDate, endDate, userId, categoryId],
  );

  return queryResult;
};

/**
 * Delete one timer by id
 * @param {number} id - timer id
 */

const deleteTimerById = async (userId, id) => {
  const queryResult = await connectDb.query(
    `DELETE FROM "NoAddiction".timers where timers._id = $1 AND timers.user_id = $2`,
    [id, userId],
  );

  return queryResult;
};

const getPreLastTimer = async (userId, categoryId, requestOffset) => {
  const queryResult = await connectDb.query(
    'SELECT * FROM "NoAddiction"."timers" WHERE timers.user_id = $1 AND timers.category_id = $2 ORDER BY end_date DESC LIMIT 1 OFFSET $3',
    [userId, categoryId, requestOffset],
  );

  return queryResult;
};

module.exports = {
  getAllTimers,
  getCurrentTimer,
  getLastTimer,
  updateCurrentTimerEndDate,
  createNewDate,
  getRecordsListWithDuration,
  deleteTimerById,
  getPreLastTimer,
};
