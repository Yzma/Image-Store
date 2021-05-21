
import path from 'path'
import multer from 'multer';
import cryptoRandomString from 'crypto-random-string';

import initMiddleware from './initMiddleware'

import { InvalidFileTypeError } from '../errors';
import * as Constants from '../constants'

const CRYPTO_RANDOM_STRING_OPTIONS = {
    length: 10,
    type: 'url-safe'
}

const upload = multer({

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, Constants.IMAGE_DESTINATION_FOLDER)
        },

        filename: (req, file, cb) => {
            const random = cryptoRandomString(CRYPTO_RANDOM_STRING_OPTIONS);
            cb(null, `${random}-${path.extname(file.originalname)}`)
        }
    }),

    fileFilter: (req, file, callback) => {
        if(Constants.ACCEPTED_FILE_UPLOAD_MIME_TYPES.includes(file.mimetype)) {
            callback(null, true);
        } else {
            return callback(new InvalidFileTypeError('Only .png, .jpg and .jpeg format allowed!'));
        }
    },

    limits: {
        files: Constants.MAX_IMAGES_PER_UPLOAD,
        fileSize: Constants.MAX_FILE_SIZE_IN_BYTES
    }
})

export const MulterMiddleware = initMiddleware(upload.array('images'))