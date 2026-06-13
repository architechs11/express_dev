const userService = require("../services/userService");

const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await userService.fetchUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const fetchUsers = async (req, res, next) => {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, contact, dob } = req.body;

    if (!name || !contact || !dob) {
      return res.status(400).json({ message: "All details are required" });
    }

    const user = await userService.createUser(name, contact, dob);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchUser,
  fetchUsers,
  createUser,
};
