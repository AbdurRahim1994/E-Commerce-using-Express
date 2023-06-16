const mongoose = require('mongoose')
const fs = require('fs')
const ProductCreateUpdateService = async (request, productModel) => {
    try {
        if (request.body.id) {
            const { id } = request.body;
            const postBody = request.body;
            const photo = request.file;
            const paramId = new mongoose.Types.ObjectId(id);

            const productExists = await productModel.aggregate([
                { $match: { _id: paramId } },
                { $count: "total" }
            ])

            if (productExists.length <= 0) {
                return { status: "Product not found" }
            }
            else {
                let updatedProduct;
                if (photo) {
                    updatedProduct = await productModel.updateOne(
                        { _id: paramId },
                        {
                            title: postBody.title,
                            description: postBody.description,
                            price: postBody.price,
                            quantity: postBody.quantity,
                            categoryId: postBody.categoryId,
                            image: {
                                data: fs.readFileSync("src/uploads/" + photo.filename),
                                contentType: photo.mimetype
                            }
                        })
                }
                else {
                    updatedProduct = await productModel.updateOne(
                        { _id: paramId },
                        {
                            title: postBody.title,
                            description: postBody.description,
                            price: postBody.price,
                            quantity: postBody.quantity,
                            categoryId: postBody.categoryId
                        })
                }
                return { status: "success", data: updatedProduct }
            }
        }
        else {
            const postBody = request.body;
            const photo = request.file;

            const productNameExists = await productModel.aggregate([
                { $match: { title: postBody.title } },
                { $count: "total" }
            ])

            if (productNameExists.length > 0) {
                return { status: "Product title already exists" }
            }
            else {

                const product = await new productModel({
                    title: postBody.title,
                    description: postBody.description,
                    price: postBody.price,
                    quantity: postBody.quantity,
                    categoryId: postBody.categoryId,
                    image: {
                        data: fs.readFileSync("src/uploads/" + photo.filename),
                        contentType: photo.mimetype
                    }
                }).save()

                return { status: "success", data: product }
            }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = ProductCreateUpdateService