const { HashingPassword } = require('../../utility/PasswordUtility')

const UserRegistrationService = async (request, userModel) => {
    try {
        const postBody = request.body;
        const emailRegex = /^\S+@\S+\.\S+$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        const emailExists = await userModel.aggregate([
            { $match: { email: postBody.email } }
        ])

        if (emailExists.length > 0) {
            return { status: "Email already exists" }
        }
        else if (!emailRegex.test(postBody.email)) {
            return { status: "Invalid email" }
        }
        else if (!passwordRegex.test(postBody.password)) {
            return { status: "Password must be at least 8 characters including 1 uppercase, 1 lowercase, 1 number" }
        }
        else {
            const hashedPassword = await HashingPassword(postBody.password)
            postBody.password = hashedPassword;
            const user = await userModel.create(postBody);
            return { status: "success", data: user }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserRegistrationService;