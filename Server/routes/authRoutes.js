const express = require('express');
const   router = express.Router();
const { signup, login } = require("../controllers/authController")
const { signupMiddleware, loginMiddleware } = require("../middlewares/AuthValidation")
router.post("/signup", signupMiddleware, signup);
router.post('/login', loginMiddleware, login);
router.post('/forgot-password',)
module.exports = router;    