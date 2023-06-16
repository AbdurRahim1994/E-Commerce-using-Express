const CreateToken = require('../../utility/TokenUtility')
const { ComparePassword } = require('../../utility/PasswordUtility')

const UserLoginService = async (request, userModel) => {
    try {
        const { email, password } = request.body;

        const emailExists = await userModel.aggregate([
            { $match: { email: email } }
        ])

        if (emailExists.length <= 0) {
            return { status: "Invalid username / password" }
        }
        else if (!await ComparePassword(password, emailExists[0]['password'])) {
            return { status: "Invalid username / password" }
        }
        else {
            const token = await CreateToken(emailExists[0]['email']);
            return { status: "success", token: token, data: emailExists[0] }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserLoginService;