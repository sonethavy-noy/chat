const chatlist = require('../models/chatlist.model');
const chatlistModel = new chatlist();
const uuid = require('uuid');

const chat = require('../models/chat.model');
const chatModel = new chat();

/* findAll Chat */
exports.findAll = async(req, res, next) => {
    let data = await chatModel.findAll();
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        results: data
    }); 
}

/* findOne Chat */

exports.findOne = async (req, res, next) => {
    // try {
    let chatUq_id = req.params.chatUq_id;
    const data = await chatModel.findOne(chatUq_id);
    console.log(data)
        // if (data) {
            res.status(200).json({
                statusCode: 200,
                message: 'success',
                results: data
            });
    //     } else {
    //         res.status(404).json({
    //             statusCode: 404,
    //             message: 'Not Found'
    //         })
    //     }
    // } catch (err) {
    //     res.status(404).json({
    //         statusCode: 404,
    //         message: 'Not Found'
    //     });
    // }
}

/** */
/** findAll chat_list */
exports.findAll = async (req, res, next) => {
    let data = await chatlistModel.findAll();
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        results: data
    });
}
exports.findOne = async (req, res, next) => {
    try {
    let unique_id = req.params.unique_id;
    const data = await chatlistModel.findOne(unique_id);
    
        if (data) {
            res.status(200).json({
                statusCode: 200,
                message: 'success',
                results: data
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Not Found'
            })
        }
    } catch (err) {
        res.status(404).json({
            statusCode: 404,
            message: 'Not Found'
        });
    }
}
exports.insertChatlist = async (req, res, next) => {
    try {
        const unique_id = uuid.v4();
        const sender_id = req.body.sender_id;
        const receiver_id = req.body.receiver_id;
        const receiver_name = req.body.receiver_name;
        const unread = req.body.unread;
        const last_message = req.body.last_message;
        const checkData = await chatlistModel.checkData(sender_id, receiver_id, receiver_name, unread, last_message);
        if(checkData){
            res.status(400).json({
                statusCode: 400,
                message: 'already used'
            });
        }else{
            const data = new chatlist(unique_id, sender_id, receiver_id, receiver_name, unread, last_message);
                data.insert();
                res.status(201).json({
                    statusCode: 201,
                    message: 'success',
        
                });
        }
    } catch (err) {
        res.status(501).json({
            statusCode: 501,
            message: 'Not Implemented',
            error:err
        });
    }
      
}
   
exports.updateChatlist = async (req, res, next) => {
    try {
    const unique_id = req.params.unique_id;
    const sender_id = req.body.sender_id;
    const receiver_id = req.body.receiver_id;
    const receiver_name = req.body.receiver_name;
    const unread = req.body.unread;
    const last_message = req.body.last_message;
    const data = new chatlist('', sender_id, receiver_id, receiver_name, unread, last_message); 
    const getUid = await chatlistModel.findOne(unique_id);
    
        if (getUid) {
                data.update(unique_id);
                res.status(200).json({
                    statusCode: 200,
                    message: 'sucessful'
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Not Found',
                    results: null
                });
            }
        } catch (err) {
            res.status(404).json({
                statusCode: 404,
                message: 'Not Found'
            });
        }
   
}

exports.deleteChatlist = async (req, res, next) => {
    try {
    const unique_id = req.params.unique_id;
    const data = await chatlistModel.findOne(unique_id);
    
        if (data) {
            await chatlistModel.delete(unique_id);
            res.status(200).json({
                statusCode: 200,
                message: 'deleted'
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Not Found',

            });
        }
    } catch (err) {
        res.status(404).json({
            statusCode: 404,
            message: 'Not Found'
        });
    }

}

