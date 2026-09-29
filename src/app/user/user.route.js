const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.patch('/', userController.updateUser); // PATCH /users?userId=...
router.delete('/', userController.deleteUser); // DELETE /users?userId=...
router.get('/', userController.getUser); // GET /users?userId=...

module.exports = router;