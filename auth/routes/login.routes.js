const router = require('express').Router();
const loginController = require('../controllers/login.controller');

router.post('/login',loginController.userlogin);

 module.exports = router;