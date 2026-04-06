const { login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { requireDb } = require('../Middlewares/dbReady');
const signup = require('../Controllers/AuthController').signup;
const router = require('express').Router();

router.post('/login', requireDb, loginValidation, login);
router.post('/signup', requireDb, signupValidation, signup);


module.exports = router;
