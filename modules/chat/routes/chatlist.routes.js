const express = require("express");
const chatlist = require('../controller/chatlist.controller');
const chat = require('../controller/chatlist.controller');

const router = express.Router();

const checkToken = require('../../../middleware/user');
const token = checkToken.checkUser;

router.get('/all', chat.findAll);
router.get('/:chatUq_id', chat.findOne);

router.get('/all',token, chatlist.findAll);
router.get('/:unique_id',token, chatlist.findOne);
router.post('/insert',token, chatlist.insertChatlist);
router.put('/update/:unique_id',token, chatlist.updateChatlist);
router.delete('/delete/:unique_id',token, chatlist.deleteChatlist);

module.exports = router;