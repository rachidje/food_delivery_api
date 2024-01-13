import multer from "multer";
import path from 'path'

const uploadImage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathToImages = path.join(__dirname, '../images')
        cb(null, pathToImages)
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const imagesMiddleware = multer({storage: uploadImage}).array('images', 10);

export {imagesMiddleware}