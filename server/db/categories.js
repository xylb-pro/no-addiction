const connect = require('./connect');

/**
 * Query to get all user current cat by userId
 * @param {number} userId
 */
const getCurrentCategoriesById = async (userId) => {
  const queryRes = await connect.query(
    'SELECT * FROM "NoAddiction".current_user_categories WHERE user_id = $1',
    [userId],
  );

  return queryRes;
};

/**
 * Query to get all categories list
 */
const getAllCategories = async () => {
  const queryRes = await connect.query(
    'SELECT * FROM "NoAddiction".categories ORDER BY categories._id',
  );

  return queryRes;
};

/**
 * Delete query for current category
 * @param {number} userId
 * @param {number} categoryId
 */
const deleteCurrentCategoryById = async (userId, categoryId) => {
  const queryRes = await connect.query(
    'DELETE FROM "NoAddiction".current_user_categories WHERE user_id = $1 AND current_user_categories.category_id = $2',
    [userId, categoryId],
  );

  return queryRes;
};

/**
 * Add new current category
 * @param {number} userId
 * @param {number} categoryId
 */
const addNewCurrentCategory = async (userId, categoryId) => {
  const queryRes = await connect.query(
    'INSERT INTO "NoAddiction".current_user_categories VALUES ($1, $2)',
    [userId, categoryId],
  );

  return queryRes;
};

module.exports = {
  getAllCategories,
  getCurrentCategoriesById,
  deleteCurrentCategoryById,
  addNewCurrentCategory,
};
