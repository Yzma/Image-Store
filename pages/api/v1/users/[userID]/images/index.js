
import prisma from '../../../../../../util/prisma'

import { getAuthenticatedUserFromRequest } from '../../../../../../util/database/userUtil'
import { getImages } from '../../../../../../util/database/imageRepository/localFileImageRepository'

import { METHOD_NOT_SUPPORTED, NO_AUTHORIZATION, INTERNAL_SERVER_ERROR, FILES_TOO_LARGE, TOO_MANY_FILES, INVALID_FILE_TYPES } from '../../../../../../util/constants/response_constants'

import { MulterMiddleware, InvalidFileTypeError } from '../../../../../../util/middleware/multer'
import { InvalidUserError } from '../../../../../../util/errors'
import { MulterError } from 'multer'

export default async (req, res) => {

    // TODO: Comments
    const { userID } = req.query

    if (req.method === "GET") {

        // TODO: Check privacy
        //     {
        //         where: {
        //             user: {
        //                 id: parseInt(userID)
        //             }
        //         }
        //     }

        //     :

        //     {
        //         where: {
        //             user: {
        //                 id: parseInt(userID)
        //             },
        //             private: false
        //         }
        //     }
        return await getImages(userID)
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                console.error(error)
                return res.status(500).json(ResponseConstants.INTERNAL_SERVER_ERROR)
            })

    // POST request to upload image
    } else if (req.method === "POST") {

        return await getAuthenticatedUserFromRequest(req)
            .then((data) => {

                // Check if the user is who it claims to be
                if(data.id != userID) {
                    throw new InvalidUserError(NO_AUTHORIZATION)
                }

                return data
            })
            .then(() =>

                // After we confirm the user exists and authenticated, let's start uploading.
                MulterMiddleware(req, res)
            )
            .then(() => {

                // After multer has finished validating and processing the incoming files, we then create an array of transactions
                // that will map the files on disk to the database.

                // TODO: Still don't like this... Find out a better way to batch, perhaps just remove the array entirely?
                const parsedUserID = parseInt(userID)
                const transactions = []

                for (const newImg of req.files) {

                    const result = prisma.image.create({
                        data: {
                            title: newImg.originalname,
                            fileName: newImg.filename,
                            fileType: newImg.mimetype,
                            user: {
                                connect: {
                                    id: parsedUserID
                                }
                            }
                        }
                    })

                    transactions.push(result)
                }

                return transactions

            }).then((transactions) =>

                // Batch the transactions that we created to map each file into the database
                prisma.$transaction(transactions)

            ).then((value) => {

                // After everything is complete, return that all files were successfully uploaded
                return res.status(200).json({ success: value })
            })

            .catch((error) => {

                // The error handling here is a little weird due to how Multer does it's error handling.
                // This catches all the errors that are most likely to happen, and returns a 500 if it's a different error.
                if (error instanceof MulterError) {
                    if (error.code == 4) {
                        return res.status(400).json({ error: FILES_TOO_LARGE })
                    } else if (error.code == 5) {
                        return res.status(400).json({ error: TOO_MANY_FILES })
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
