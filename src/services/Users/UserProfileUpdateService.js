const UserUpdateService = async (request, userModel) => {
    try {
        const { email } = request.headers;
        const postBody = request.body;
        const updateBody = {
            name: postBody.name,
            phone:postBody.phone
        }

        const userExists = await userModel.aggregate([
            { $match: { email: email } },
            { $count: "total" }
        ])

        if (userExists.length <= 0) {
            return { status: "No user found" }
        }
        else {
            const updatedUser = await userModel.updateOne({ email: email }, updateBody);
            return { status: "success", data: updatedUser }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserUpdateService;