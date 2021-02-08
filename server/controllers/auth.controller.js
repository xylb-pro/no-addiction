const services = require('../services');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  async registerWithEmail(req, res) {
    try {
      const { username, email, password } = req.body;
      const candidate = await services.getUserByEmailAndUsername(
        email,
        username
      );

      //check if email or username exists in db
      if (candidate.usernameExists && candidate.usernameExists) {
        return res.status(409).json({
          message: `User with username: ${username}, email: ${email} is already registred`,
        });
      }
      if (candidate.emailExists) {
        return res.status(409).json({
          message: `User with email: ${email} is already registred`,
        });
      }
      if (candidate.usernameExists) {
        return res.status(409).json({
          message: `User with username: ${username} is already registred`,
        });
      }

      const hashedPassword = await bcript.hash(password, 12);
      const registredUser = await services.createNewUser(
        username,
        email,
        hashedPassword
      );
      //add current cat for user (default 1)
      await services.addCurrentCategory(registredUser._id, 1);
      //get token to new user
      //TODO make a function ERROR!!!! with function get user

      const token = jwt.sign(
        { userId: registredUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );

      res.status(201).json({
        message: `User ${username || email} registred successfully`,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong with register' });
    }
  }

  async loginWithEmail(req, res) {
    try {
      let { usernameOrEmail, password } = req.body;
      const user = await services.getUserByEmailOrUsername(usernameOrEmail);

      //check if email or username exists in db
      if (!user) {
        return res.status(409).json({
          message: `User not found`,
        });
      }

      const isPasswordMatch = await bcript.compare(
        password,
        user.hash_password
      );
      if (!isPasswordMatch) {
        res.status(400).json({ message: 'Incorrent password' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong with login' });
    }
  }

  async authWithGoogleJwt(req, res) {
    try {
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      // res.redirect('http://localhost:3001/' + token);

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error with create token' });
    }
  }
}

module.exports = new AuthController();
