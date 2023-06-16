const mongoose = require('mongoose')
const RelatedProductService = async (request, productModel) => {
    try {
        const { categoryId, productId } = request.params;
        const category = new mongoose.Types.ObjectId(categoryId)
        const product = new mongoose.Types.ObjectId(productId);

        const productList = await productModel.aggregate([
            { $match: { $and: [{ categoryId: category }, { _id: { $ne: product } }] } },
            { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "Category" } },
            {
                $facet:{
                    Total:[{$count:"total"}],
                    Row:[{$limit:5}]
                }
            }
        ])

        if (productList.length <= 0) {
            return { status: "No product found" }
        }
        else {
            return { status: "success", data: productList }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = RelatedProductService;