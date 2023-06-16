const mongoose = require("mongoose");
const slugify = require('slugify')

const CategoryCreateUpdateService = async (request, categoryModel) => {
    try {
        if (request.body.id) {
            const { id } = request.body;
            const paramId = new mongoose.Types.ObjectId(id)
            const postBody = request.body;

            const categoryExists = await categoryModel.aggregate([
                { $match: { _id: paramId } },
                { $count: "total" }
            ])

            if (categoryExists.length <= 0) {
                return { status: "Category not found" }
            }
            else {
                postBody.slug = slugify(postBody.name)
                const updatedCategory = await categoryModel.updateOne({ _id: paramId }, postBody)
                return { status: "success", data: updatedCategory }
            }
        }
        else {
            const postBody = request.body;
            const categoryExists = await categoryModel.aggregate([
                { $match: { name: postBody.name } },
                { $count: "total" }
            ])

            if (categoryExists.length > 0) {
                return { status: "Category name already exists" }
            }
            else {
                postBody.slug = slugify(postBody.name)
                const category = await categoryModel.create(postBody)
                return { status: "success", data: category }
            }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = CategoryCreateUpdateService