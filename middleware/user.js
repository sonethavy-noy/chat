const jwt = require('jsonwebtoken');
const user_secret = process.env.USER_KEYS

module.exports = {

    checkUser: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            jwt.verify(token, `${user_secret}`, (err, decodes) => {
                if (err) {
                    res.status(404).json({
                        statusCode: 404,
                        message: 'Invalid token'
                    });
                } else {
                    req.userId = decodes.unique_id,
                        next()
                }
            })
        } else {
            res.status(200).json({
                statusCode: 200,
                message: 'Access denied unauthorized user'
            })
        }
    }

}

