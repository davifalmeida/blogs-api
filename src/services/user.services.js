const { User } = require('../models');

const createUser = async (user) => {
  const { email } = user;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new Error('User already exists');
  }
  return User.create(user);
};

module.exports = {
    createUser,
};