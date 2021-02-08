const services = require('../services');
const bcript = require('bcryptjs');
const e = require('express');

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await services.getAllUsers();
      res.json(users.rows);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }

  async getUserById(req, res) {
    const id = req.user.userId;
    try {
      const user = await services.getUserById(id);

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }

  async updateCurrentUserCategory(req, res) {
    const id = req.user.userId;
    const categoryId = req.body.categoryId;
    try {
      await services.updateCurrentUserCategory(id, categoryId);

      res.json({ message: `Current user category updated to ${categoryId}` });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }

  async updateUserHashPassword(req, res) {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    try {
      const currentHashPassword = await services.getUserHashPassword(userId);
      const isPasswordMatch = await bcript.compare(
        oldPassword,
        currentHashPassword
      );

      if (isPasswordMatch) {
        if (oldPassword === newPassword)
          res
            .status(500)
            .json({ message: 'New password and old password are the same' });
        else {
          const newHashPassword = await bcript.hash(newPassword, 12);
          await services.updateUserHashPassword(userId, newHashPassword);
        }
      } else {
        res.status(500).json({ message: 'Passwords do not match' });
      }

      res.json({
        message: `UserId: ${userId} password updated successfully`,
      });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }
}

module.exports = new UsersController();
