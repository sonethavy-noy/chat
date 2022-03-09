const express = require("express");
const user = require('../controller/user.controller');
const router = express.Router();

const checkToken = require('../../../middleware/user');
const token = checkToken.checkUser;


router.get('/all',token, user.findAll);

router.get('/:unique_id',token, user.findOne);

router.post('/add', user.insertUser);

router.put('/update/:unique_id',token, user.updateUser);

router.delete('/delete/:unique_id',token, user.deleteUser);

module.exports = router;