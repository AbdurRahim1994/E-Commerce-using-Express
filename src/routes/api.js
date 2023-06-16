const express = require('express')
const router = express.Router();
const { UserRegistration, UserLogin, UserProfileDetail, UserProfileUpdate } = require('../controllers/Users/UserController')
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware')
const CategoryController = require('../controllers/Category/CategoryController')
const ProductController = require('../controllers/Products/ProductController')
const { FileUpload, ErrorHandling } = require('../utility/FileUploadUtility')
const AdminCheckMiddleware = require('../middlewares/AdminCheckMiddleware')

// User Module
router.post('/UserRegistration', UserRegistration)
router.post('/UserLogin', UserLogin)
router.get('/UserProfileDetail', AuthVerifyMiddleware, UserProfileDetail)
router.post('/UserProfileUpdate', AuthVerifyMiddleware, UserProfileUpdate)

// Category Module
router.post('/CategoryCreateUpdate', AuthVerifyMiddleware, AdminCheckMiddleware, CategoryController.CategoryCreateUpdate)
router.get('/CategoryList/:pageNo/:perPage/:search', AuthVerifyMiddleware, AdminCheckMiddleware, CategoryController.CategoryList);
router.get('/CategoryById/:id', AuthVerifyMiddleware, AdminCheckMiddleware, CategoryController.CategoryById)
router.post('/CategoryDelete/:id', AuthVerifyMiddleware, AdminCheckMiddleware, CategoryController.CategoryDelete);
router.get('/CategoryDropDown', CategoryController.CategoryDropDown)

// Product Module
router.post('/ProductCreateUpdate', AuthVerifyMiddleware, AdminCheckMiddleware, FileUpload.single('image'), ErrorHandling, ProductController.ProductCreateUpdate)
router.get('/ProductList/:pageNo/:perPage/:search', ProductController.ProductList);
router.get('/ProductById/:id', ProductController.ProductById)
router.post('/ProductDelete/:id', AuthVerifyMiddleware, AdminCheckMiddleware, ProductController.ProductDelete)
router.post('/ProductFilter', ProductController.ProductFilter);
router.get('/RelatedProduct/:categoryId/:productId', ProductController.RelatedProduct)
module.exports = router;