
import initMiddleware from './initMiddleware'

import * as Constants from '../constants'

import multer from 'multer';
import cryptoRandomString from 'crypto-random-string';

const path = require("path")

const upload = multer({

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, Constants.IMAGE_DESTINATION_FOLDER)
        },

        filename: (req, file, cb) => {
            const random = cryptoRandomString({length: 10, type: 'url-safe'});
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
        fileSize: Constants.MAX_FILE_SIZE_IN_BYTES, // 1 MB (max file size)
    }
})

export class InvalidFileTypeError extends Error {
    constructor(params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidFileTypeError)
        }

        this.name = 'InvalidFileTypeError'
    }
}

export const MulterMiddleware = initMiddleware(upload.array('images'))