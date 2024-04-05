const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').put(updateUser).get(getOneUser).delete(deleteUser);

module.exports = router;
