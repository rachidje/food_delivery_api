import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const uploadImage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb) {
        cb(null, `${new Date()}_${file.originalname}`)
    }
})

const imagesMiddleware = multer({storage: uploadImage}).array('images', 10);

export {imagesMiddleware}