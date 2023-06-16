const CategoryModel = require('../../models/Category/CategoryModel')
const ProductModel = require('../../models/Products/ProductModel')
const CategoryByIdService = require('../../services/Category/CategoryByIdService')
const CategoryCreateUpdateService = require('../../services/Category/CategoryCreateUpdateService')
const CategoryListService = require('../../services/Category/CategoryListService')
const CheckAssociateService = require('../../services/Common/CheckAssociateService')
const DeleteService = require('../../services/Common/DeleteService')
const CategoryDropDownService = require('../../services/Category/CategoryDropDownService')

exports.CategoryCreateUpdate = async (req, res) => {
    const result = await CategoryCreateUpdateService(req, CategoryModel)
    res.status(200).json(result);
}

exports.CategoryList = async (req, res) => {
    const result = await CategoryListService(req, CategoryModel)
    res.status(200).json(result);
}

exports.CategoryDelete = async (req, res) => {
    const associate = await CheckAssociateService(req, ProductModel, 'categoryId')
    if (associate) {
        res.status(200).json({ status: "associate", data: "Associate with product" })
    }
    else {
        const result = await DeleteService(req, CategoryModel)
        res.status(200).json(result);
    }
}

exports.CategoryById = async (req, res) => {
    const result = await CategoryByIdService(req, CategoryModel);
    res.status(200).json(result);
}

exports.CategoryDropDown = async (req, res) => {
    const result = await CategoryDropDownService(req, CategoryModel)
    res.status(200).json(result);
}

