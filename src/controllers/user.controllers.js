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

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  user.password = undefined;
  delete user.password;
  return res.status(200).json(user);
};

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
};