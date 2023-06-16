const { Error } = require('mongoose')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads')
    },

    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname.replace(fileExt, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now()
        cb(null, fileName + fileExt)
    }
})

exports.FileUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'image') {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
                cb(null, true)
            }
            else {
                return (new Error("Only .png, .jpg, .jpeg format are allowed"))
            }
        }
        else {
            return (new Error("Only image is allowed to upload"))
        }
    }
})

exports.ErrorHandling = (err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("There is an upload error")
        }
        else {
            res.status(200).send(err.message)
        }
    }
    else {
        res.send("Successfully Uploaded")
    }

    next();
}