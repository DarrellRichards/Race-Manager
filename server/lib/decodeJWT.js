const jwt = require('jsonwebtoken');


const decodeJWT = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded._id;
}

module.exports = decodeJWT;
