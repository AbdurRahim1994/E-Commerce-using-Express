const mongoose = require("mongoose");

const DeleteService = async (request, model) => {
    try {
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);

        const dataExists = await model.aggregate([
            { $match: { _id: paramId } },
            { $count: "total" }
        ])

        if (dataExists.length <= 0) {
            return { status: "No data found" }
        }
        else {
            const deletedData = await model.deleteOne({ _id: paramId })
            return { status: "success", data: deletedData }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = DeleteService;