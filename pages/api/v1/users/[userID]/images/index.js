

import { getAuthenticatedUserFromRequest } from '../../../../../../util/database/userUtil'
import { getImages, uploadImages } from '../../../../../../util/database/imageRepository/localFileImageRepository'

import { METHOD_NOT_SUPPORTED, INTERNAL_SERVER_ERROR, FILES_TOO_LARGE, TOO_MANY_FILES, INVALID_FILE_TYPES } from '../../../../../../util/constants/response_constants'

import { MulterMiddleware, InvalidFileTypeError } from '../../../../../../util/middleware/multer'
import { InvalidUserError } from '../../../../../../util/errors'
import { MulterError } from 'multer'

export default async (req, res) => {

    // TODO: Comments
    const { userID, visibility } = req.query

    if (req.method === "GET") {
        return await getImages(userID, visibility)
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                console.error(error)
                return res.status(500).json(ResponseConstants.INTERNAL_SERVER_ERROR)
            })

    // POST request to upload image
    } else if (req.method === "POST") {

        return await getAuthenticatedUserFromRequest(req, { ensureUserID: userID })
            .then(() =>

                // After we confirm the user exists and authenticated, let's start uploading.
                MulterMiddleware(req, res)
            )
            .then(() => 

                // Map uploaded files to the database
                uploadImages(userID, req.files)
            )
            .then((value) => {

                // After everything is complete, return that all files were successfully uploaded
                return res.status(200).json({ success: value })
            })

            .catch((error) => {

                // The error handling here is a little weird due to how Multer does it's error handling.
                // This catches all the errors that are most likely to happen, and returns a 500 if it's a different error.
                if (error instanceof MulterError) {
                    if (error.code == 'LIMIT_FILE_COUNT') {
                        return res.status(400).json({ error: TOO_MANY_FILES })
                    } else if (error.code == 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({ error: FILES_TOO_LARGE })
                    }
                } else if (error instanceof InvalidFileTypeError) {
                    return res.status(400).json({ error: INVALID_FILE_TYPES })
                } else if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                }

                console.error(error)
                return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}
