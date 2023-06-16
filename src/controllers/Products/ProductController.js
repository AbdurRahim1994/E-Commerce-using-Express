const ProductModel = require('../../models/Products/ProductModel')
const ProductCreateUpdateService = require('../../services/Products/ProductCreateUpdateService')
const ProductByIdService = require('../../services/Products/ProductByIdService')
const ProductListService = require('../../services/Products/ProductListService')
const DeleteService = require('../../services/Common/DeleteService')
const ProductFilterService = require('../../services/Products/ProductFilterService')
const RelatedProductService = require('../../services/Products/RelatedProductService')


exports.ProductCreateUpdate = async (req, res) => {
    const result = await ProductCreateUpdateService(req, ProductModel)
    res.status(200).json(result)
}

exports.ProductById = async (req, res) => {
    const result = await ProductByIdService(req, ProductModel)
    res.status(200).json(result);
}

exports.ProductList = async (req, res) => {
    const result = await ProductListService(req, ProductModel)
    res.status(200).json(result);
}

exports.ProductDelete = async (req, res) => {
    const result = await DeleteService(req, ProductModel)
    res.status(200).json(result);
}

exports.ProductFilter = async (req, res) => {
    const result = await ProductFilterService(req, ProductModel)
    res.status(200).json(result);
}

exports.RelatedProduct = async (req, res) => {
    const result = await RelatedProductService(req, ProductModel)
    res.status(200).json(result);
}