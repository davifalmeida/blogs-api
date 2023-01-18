const { User } = require('../models');

const createUser = async (user) => {
  const { email } = user;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new Error('User already exists');
  }
  return User.create(user);
};

const getAllUsers = async () => {
    const users = await User.findAll();
    // users.forEach((user) => delete user.dataValues.password);
    // return users;
    const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user.dataValues;
        return userWithoutPassword;
      });
    
      return usersWithoutPassword;
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    
    return user;
  };

  const deleteUser = async (id) => {
    await User.destroy({ where: { id } });
  };

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};