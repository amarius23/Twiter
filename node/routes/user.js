const express = require("express");
const router = express.Router();

const authController = require("../controllers/user");

router.post('/login', authController.login);
//router.post('/logout', authController.logout);
router.post('/register',authController.register);
router.get('/get',authController.get);
module.exports = router;