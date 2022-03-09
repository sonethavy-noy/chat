const user = require('../models/user.model');
const userModel = new user();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

exports.findAll = async (req, res, next) => {
    let data = await userModel.findAll();
    console.log(data);
    res.status(200).send({
        statusCode: 200,
        message: 'Successfully!',
        result: data
    });
};
exports.findOne = async (req, res, next) => {
    try {
    let unique_id = req.params.unique_id;
    let data = await userModel.findOne(unique_id);
        if (data) {
            res.status(200).json({
                statusCode: 200,
                message: 'sucessful',
                results: data
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

};

exports.insertUser = async (req, res, next) => {
    const unique_id = uuid.v4();
    const username = req.body.username;
    const password = req.body.password;
    const re_password = req.body.re_password;
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const tel = req.body.tel;

    const data = new user(unique_id, username, hashPassword, tel);


    if (!username || username.length < 3) {
        res.status(400).json({
            statusCode: 400,
            message: 'Please enter a username with min 3 chars '
        });
    } else if (!re_password || password != re_password) {
        res.status(400).json({
            statusCode: 400,
            message: 'Both password must match'
        });
    } else {
        let checkUsername = await userModel.checkUsername(username);

        if (checkUsername.length > 0) {
            res.status(403).send({
                statusCode: 403,
                message: 'username already exits!'
            });
        } else {
            data.insert();
            res.status(201).send({
                statusCode: 201,
                message: 'successfully'
            });
        }

    }

}

exports.updateUser = async (req, res, next) => {
    try {
    const unique_id = req.params.unique_id;
    const username = req.body.username;
    const password = req.body.password;
    const re_password = req.body.re_password;
    const tel = req.body.tel;

    const getId = await userModel.findOne(unique_id); 
    let hashPassword;
    var salt = bcrypt.genSaltSync(10);

        if (getId.unique_id) {
            let pw_current = getId.password;

            if (pw_current == password) {
                hashPassword = pw_current;
            } else {

                hashPassword = await bcrypt.hash(password, salt);
            }
            const data = new user(unique_id, username, hashPassword, tel);
            if (!username || username.length < 3) {
                res.status(400).json({
                    statusCode: 400,
                    message: 'Please enter a username with min 3 chars '
                });
            } else if (!re_password || password != re_password) {
                res.status(400).json({
                    statusCode: 400,
                    message: 'Both password must match'
                });
            } else {
                data.update(unique_id);
                res.status(201).send({
                    statusCode: 201,
                    message: 'successfully'
                });
            }
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Not Found'
            });
        }
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: 'Not Found'
        });
    }


}

exports.deleteUser = async (req, res, next) => {
    const unique_id = req.params.unique_id;
    const data = await userModel.findOne(unique_id);
    try {
        if (data) {
            await userModel.delete(unique_id);
            res.status(200).json({
                statusCode: 200,
                message: 'sucessful',
                results: data
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
            message: 'Not Found',
            results: null
        });
    }
}