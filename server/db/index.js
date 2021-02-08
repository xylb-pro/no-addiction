const {
  getAllTimers,
  getCurrentTimer,
  getLastTimer,
  updateCurrentTimerEndDate,
  createNewDate,
  getRecordsListWithDuration,
  deleteTimerById,
} = require('./timers');
const {
  getAllUsers,
  createNewUser,
  getUserByEmail,
  getUserByUsername,
  getUserByEmailOrUsername,
  getUserById,
  updateCurrentUserCategory,
  updateUserHashPassword,
} = require('./users');
const { getAllQuotes, getAllBadOrNotQuotes } = require('./quotes');
const {
  getCurrentCategoriesById,
  getAllCategories,
  addNewCurrentCategory,
  deleteCurrentCategoryById,
} = require('./categories');

module.exports = {
  getAllTimers,
  getAllUsers,
  getCurrentTimer,
  addNewCurrentCategory,
  deleteCurrentCategoryById,
  getLastTimer,
  getAllQuotes,
  getAllBadOrNotQuotes,
  updateCurrentTimerEndDate,
  createNewDate,
  getRecordsListWithDuration,
  getUserById,
  deleteTimerById,
  createNewUser,
  getUserByEmail,
  getUserByUsername,
  getUserByEmailOrUsername,
  updateCurrentUserCategory,
  getCurrentCategoriesById,
  getAllCategories,
  updateUserHashPassword,
};
