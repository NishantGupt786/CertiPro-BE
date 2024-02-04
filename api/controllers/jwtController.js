const jwt = require('jsonwebtoken');
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY

const jwtController = {
    signAccessToken: (email) => {
        const payload = {email: email};
        return jwt.sign(payload, SECRET_KEY)
    }
}

module.exports = jwtController