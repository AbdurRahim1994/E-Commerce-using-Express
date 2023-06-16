const jwt = require('jsonwebtoken');

const CreateToken = async (data) => {
    return await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data: data
    }, 'SecretKey123456789')
}

module.exports = CreateToken