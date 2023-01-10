const joi = require('joi');

const commonFieldProps = joi.string().required();

const validateUser = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const schema = joi.object({
    displayName: commonFieldProps.min(8).messages({
      'string.min': '"displayName" length must be at least 8 characters long' }),
    email: commonFieldProps.email().messages({
      'string.email': '"email" must be a valid email' }),
    password: commonFieldProps.min(6).messages({
      'string.min': '"password" length must be at least 6 characters long' }),
    image: joi.string().optional(),
  });

  const { error } = schema.validate({ displayName, email, password, image });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  return next();
};

module.exports = {
  validateUser,
};
