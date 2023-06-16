const CategoryListService = async (request, categoryModel) => {
    try {
        const pageNo = Number(request.params.pageNo)
        const perPage = Number(request.params.perPage)
        const { search } = request.params
        const skipRow = (pageNo - 1) * perPage
        let categoryList;
        const searchQuery = { "$regex": search, "$options": "i" }

        if (search !== "0") {
            categoryList = await categoryModel.aggregate([
                { $match: { $or: [{ name: searchQuery }, { slug: searchQuery }] } },
                {
                    $facet: {
                        Total: [{ $count: "total" }],
                        Row: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }
        else {
            categoryList = await categoryModel.aggregate([
                {
                    $facet: {
                        Total: [{ $count: "total" }],
                        Row: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }

        if (categoryList[0]['Row'].length <= 0) {
            return { status: "No category found" }
        }
        else {
            return { status: "success", data: categoryList }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = CategoryListService;