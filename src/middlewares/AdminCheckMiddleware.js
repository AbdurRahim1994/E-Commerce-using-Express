const UserModel = require('../models/Users/UserModel')

const AdminCheck = async (req, res, next) => {
    try {
        const { email } = req.headers;

        const user = await UserModel.aggregate([
            { $match: { email: email } }
        ])

        if (user[0]['role'] === 1) {
            next()
        }
        else {
            res.status(401).json({ status: "Sorry ! you do not have permission" })
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }

}

module.exports = AdminCheck