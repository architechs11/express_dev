const service = require("../services/authService");

const login = async (req, res, next) => {
  try {
    const { contact, password } = req.body;
    const result = await service.login(contact, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
