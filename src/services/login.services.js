const { User } = require('../models');

const loginService = async ({ email, password }) => {
  const login = await User.create({ email, password });

  return login;
};

const getEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};
  
module.exports = {
  loginService,
  getEmail,
};