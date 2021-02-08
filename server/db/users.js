const connectDb = require('./connect');

const getAllUsers = async () => {
  const query = await connectDb.query('select * from "NoAddiction"."users"');

  return query;
};

const getUserById = async (id) => {
  const queryRes = await connectDb.query(
    'SELECT * FROM "NoAddiction".users WHERE users._id = $1',
    [id]
  );

  return queryRes;
};

const createNewUser = async (username, email, hashPassword) => {
  const queryResult = await connectDb.query(
    `INSERT INTO "NoAddiction".users ( username, email, hash_password) VALUES ($1, $2, $3)
    RETURNING *`,
    [username, email, hashPassword]
  );

  return queryResult;
};

const getUserByEmail = async (email) => {
  const queryRes = await connectDb.query(
    'SELECT * FROM "NoAddiction".users WHERE email = $1',
    [email]
  );

  return queryRes;
};

const getUserByUsername = async (username) => {
  const queryRes = await connectDb.query(
    'SELECT * FROM "NoAddiction".users WHERE username = $1',
    [username]
  );

  return queryRes;
};

const getUserByEmailOrUsername = async (usernameOrEmail) => {
  const queryRes = await connectDb.query(
    'SELECT * FROM "NoAddiction".users WHERE username = $1 OR email = $1',
    [usernameOrEmail]
  );

  return queryRes;
};

const updateCurrentUserCategory = async (userId, categoryId) => {
  const queryRes = await connectDb.query(
    'UPDATE "NoAddiction".users SET current_category_id = $1 where _id = $2',
    [categoryId, userId]
  );

  return queryRes;
};

const updateUserHashPassword = async (userId, newHashPassword) => {
  const queryRes = await connectDb.query(
    'UPDATE "NoAddiction".users SET hash_password = $1 where _id = $2',
    [newHashPassword, userId]
  );
  return queryRes;
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUserByEmailOrUsername,
  updateCurrentUserCategory,
  updateUserHashPassword,
};
