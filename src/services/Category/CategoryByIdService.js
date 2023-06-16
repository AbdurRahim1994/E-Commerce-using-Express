const mongoose = require("mongoose");

const CategoryByIdService = async (request, categoryModel) => {
    try {
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const categoryExists = await categoryModel.aggregate([
            { $match: { _id: paramId } }
        ])

        if (categoryExists.length <= 0) {
            return { status: "Category not found" }
        }
        else {
            return { status: "success", data: categoryExists }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = CategoryByIdService;