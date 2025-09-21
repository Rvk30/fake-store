// backend/controllers/usersController.js

const getUsers = (req, res) => {
  res.json({ message: "Get all users" });
};

const getUser = (req, res) => {
  res.json({ message: `Get user with id ${req.params.id}` });
};

const createUser = (req, res) => {
  res.json({ message: "User created" });
};

const updateUser = (req, res) => {
  res.json({ message: `Update user with id ${req.params.id}` });
};

const deleteUser = (req, res) => {
  res.json({ message: `Delete user with id ${req.params.id}` });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
