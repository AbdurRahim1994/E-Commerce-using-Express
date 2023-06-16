const mongoose = require('mongoose');
const ProductFilterService = async (request, productModel) => {
    try {
        let { radio, checked } = request.body;
        let productList;

        if (radio.length > 0 || checked.length > 0) {
            productList = await productModel.aggregate([
                { $match: { $or: [{ categoryId: checked }, { price: { $gte: radio[0], $lte: radio[1] } }] } },
                { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "Category" } },
                { $limit: 10 }
            ])
        }

        return { status: "success", data: productList }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = ProductFilterService;