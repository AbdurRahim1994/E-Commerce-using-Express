const CategoryDropDownService = async (request, categoryModel) => {
    try {
        const categoryList = await categoryModel.aggregate([
            { $project: { _id: 1, name: 1 } }
        ])

        if (categoryList.length <= 0) {
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

module.exports = CategoryDropDownService;