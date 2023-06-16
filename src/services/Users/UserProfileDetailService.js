const UserDetailService = async (request, userModel) => {
    try {
        const { email } = request.headers;

        const userExists = await userModel.aggregate([
            { $match: { email: email } }
        ])

        if (userExists.length <= 0) {
            return { status: "No user found" }
        }
        else {
            return { status: "success", data: userExists }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserDetailService;