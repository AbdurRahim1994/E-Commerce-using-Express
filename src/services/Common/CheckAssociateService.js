const mongoose = require("mongoose");

const CheckAssociateService = async (request, associateModel, joining) => {
    try {
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);

        const queryObject = {};
        queryObject[joining] = paramId

        const dataExists = await associateModel.aggregate([
            { $match: queryObject }
        ])

        return dataExists.length > 0
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = CheckAssociateService;