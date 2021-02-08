const db = require('../db/index');

async function getAllUsers() {
  try {
    const users = await db.getAllUsers();
    return users;
  } catch (error) {
    throw new Error('Get all users server error');
  }
}

async function createNewUser(username, email, hashedPassword) {
  try {
    const result = await db.createNewUser(username, email, hashedPassword);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Create new user error
    Sql error: ${error}`);
  }
}
async function getUserByEmailAndUsername(email, username) {
  try {
    const userByEmail = await db.getUserByEmail(email);
    const userByUsername = await db.getUserByUsername(username);

    return {
      emailExists: !!userByEmail.rows.length,
      usernameExists: !!userByUsername.rows.length,
    };
  } catch (error) {
    throw new Error(`Get user by email and username
    Sql error: ${error}`);
  }
}

async function getUserByEmailOrUsername(usernameOrEmail) {
  try {
    const queryRes = await db.getUserByEmailOrUsername(usernameOrEmail);

    return queryRes.rows[0];
  } catch (error) {
    throw new Error(`Get user by email or username
    Sql error: ${error}`);
  }
}

async function getUserById(id) {
  try {
    let queryRes = await db.getUserById(id);
    queryRes = queryRes.rows[0];

    return {
      email: queryRes.email,
      username: queryRes.username,
      currentCategoryId: queryRes.current_category_id,
    };
  } catch (error) {
    throw new Error(`Can not get user by id
    Sql error: ${error}`);
  }
}

async function updateCurrentUserCategory(userId, categoryId) {
  try {
    const result = await db.updateCurrentUserCategory(userId, categoryId);

    return result;
  } catch (error) {
    throw new Error('Something wrong with update current user category');
  }
}

async function updateUserHashPassword(userId, newHashPassword) {
  try {
    const result = await db.updateUserHashPassword(userId, newHashPassword);
    return result;
  } catch (error) {
    throw new Error(`Something wrong with change user password ${id}`);
  }
}

async function getUserHashPassword(userId) {
  try {
    const res = await db.getUserById(userId);
    const currentHashPassword = res.rows[0].hash_password;
    return currentHashPassword;
  } catch (error) {
    throw new Error(`Something wrong with get user password ${id}`);
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserByEmailAndUsername,
  getUserByEmailOrUsername,
  updateCurrentUserCategory,
  getUserById,
  getUserHashPassword,
  updateUserHashPassword,
};
