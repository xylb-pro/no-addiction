const {
  getAllTimers,
  getCurrentTimer,
  getLastTimer,
  getInAddiction,
  updateCurrentTimerEndDate,
  createNewCurrentDate,
  getRecordsListWithDuration,
  deleteTimerById,
  getPreLastTimer,
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
const {
  getAllQuotes,
  getOneBadOrNotQuoteWithCategory,
  getOneRundomQuote,
} = require('./quotes.service');
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
  getOneRundomQuote,
  getLastTimer,
  getAllQuotes,
  getOneBadOrNotQuoteWithCategory,
  getInAddiction,
  updateCurrentTimerEndDate,
  createNewCurrentDate,
  getRecordsListWithDuration,
  deleteTimerById,
  getUserByEmailAndUsername,
  getPreLastTimer,
  createNewUser,
  getUserByEmailOrUsername,
  getAllCategories,
  getUserById,
  getCategoriesWithCurrent,
  updateCurrentUserCategory,
  getUserHashPassword,
  updateUserHashPassword,
};
