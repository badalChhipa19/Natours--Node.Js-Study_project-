const express = require('express');

const {
  getAllUsers,
  getUser,
  createUsers,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
