const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;

const registerUser = async (req, res) => {
  try {
  const newUser = await userService.createUser(req.body);
  delete newUser.dataValues.password;

  const token = jwt.sign({ data: newUser }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ token });
} catch (error) {
  if (error.message === 'User already exists') {
    res.status(409).json({ message: 'User already registered' });
  }
}
};
module.exports = {
  registerUser,
};