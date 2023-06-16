const ProductListService = async (request, productModel) => {
    try {
        const pageNo = Number(request.params.pageNo)
        const perPage = Number(request.params.perPage)
        const { search } = request.params;
        const skipRow = (pageNo - 1) * perPage
        let productList;
        const searchQuery = { "$regex": search, "$options": "i" }
        if (search !== "0") {
            productList = await productModel.aggregate([
                { $match: { $or: [{ title: searchQuery }, { price: searchQuery }] } },
                { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "Category" } },
                {
                    $facet: {
                        Total: [{ $count: "total" }],
                        Row: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }
        else {
            productList = await productModel.aggregate([
                { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "Category" } },
                {
                    $facet: {
                        Total: [{ $count: "total" }],
                        Row: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }

        if (productList[0]['Row'].length <= 0) {
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

module.exports = ProductListService;