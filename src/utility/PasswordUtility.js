const bcrypt = require('bcryptjs')
exports.HashingPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            else {
                bcrypt.hash(plainPassword, salt, (err, hash) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(hash)
                    }
                })
            }
        })
    })
}

exports.ComparePassword = (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
            if (err) {
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
}