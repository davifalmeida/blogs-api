require('dotenv/config');
const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const secret = process.env.JWT_SECRET || 'your-secret-token';

const isBodyValid = (email, password) => email && password;

module.exports = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!isBodyValid(email, password)) {
      return response.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await loginService.getEmail(email);

    if (!user || user.password !== password) {
      return response.status(400).json({ message: 'Invalid fields' }); 
    }

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
  const token = jwt.sign({ userId: user.id }, secret, jwtConfig);

    response.status(200).json({ token });
  } catch (err) {
    return response.status(500).json({ message: 'Erro interno', error: err.message });
  }
};