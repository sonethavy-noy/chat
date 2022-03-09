// Status Code
// 200 = ok (successful)
// 401 = Unauthorized(Username or Password invalid)

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const user = require('../../modules/chat/models/user.model');
const userModel = new user();

var secret = process.env.USER_KEYS;

exports.userlogin = (req, res, next) => {
    const username = req.body.username;

    const password = req.body.password;

    userModel.checklogin(username).then(user => {
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Username or Password invalid '
            });
        }

        userData = user[0][0];
        
        return bcrypt.compare(password, userData.password);
    
        
    }).then(result => {
        console.log(result)
        if (!result) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Username or Password invalid'
            });
        }else{
            const token = jwt.sign({
                unique_id: userData.unique_id
            }, `${secret}`, {
                expiresIn: '12h'
            });
            // console.log(token)
            return res.status(200).json({
                statusCode: 200,
                message: 'Login success',
                token: token
            });
        }
        

    }).catch(err => {
        return res.status(401).json({
            statusCode: 401,
            message: 'Username or Password invalid'
        })
    });
}