const mongoose = require("mongoose");

const ProductByIdService = async (request, productModel) => {
    try {
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);

        const productExists = await productModel.aggregate([
            { $match: { _id: paramId } },
            { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "Category" } }
        ])

        if (productExists.length <= 0) {
            return { status: "Product not found" }
        }
        else {
            return { status: "success", data: productExists }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = ProductByIdService;