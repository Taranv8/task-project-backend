const express = require('express');
const router = express.Router();
const { signupController, loginController } = require('../controllers/authController');
const {
  signupValidation,
  loginValidation,
  validate,
} = require('../middlewares/validator');

router.post('/signup', signupValidation, validate, signupController);
router.post('/login', loginValidation, validate, loginController);

module.exports = router;