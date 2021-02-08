const {
  getAllTimers,
  getCurrentTimer,
  getLastTimer,
  getInAddiction,
  updateCurrentTimerEndDate,
  createNewCurrentDate,
  getRecordsListWithDuration,
  deleteTimerById,
} = require('./timers.service');
const {
  getAllUsers,
  getUserByEmailAndUsername,
  createNewUser,
  getUserByEmailOrUsername,
  getUserById,
  updateCurrentUserCategory,
  getUserHashPassword,
  updateUserHashPassword,
} = require('./users.service');
const { getAllQuotes, getAllBadOrNotQuotes } = require('./quotes.service');
const {
  getCategoriesWithCurrent,
  getAllCategories,
  addCurrentCategory,
  deleteCurrentCategory,
} = require('./categories.service');

module.exports = {
  getAllUsers,
  getAllTimers,
  getCurrentTimer,
  addCurrentCategory,
  deleteCurrentCategory,
  getLastTimer,
  getAllQuotes,
  getAllBadOrNotQuotes,
  getInAddiction,
  updateCurrentTimerEndDate,
  createNewCurrentDate,
  getRecordsListWithDuration,
  deleteTimerById,
  getUserByEmailAndUsername,
  createNewUser,
  getUserByEmailOrUsername,
  getAllCategories,
  getUserById,
  getCategoriesWithCurrent,
  updateCurrentUserCategory,
  getUserHashPassword,
  updateUserHashPassword,
};
