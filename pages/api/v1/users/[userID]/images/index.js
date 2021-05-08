
import prisma from '../../../../../../util/prisma'
import { getUserFromAccessToken, getUserByReq, getImages } from '../../../../../../util/database/userUtil'
import { getSession } from 'next-auth/client'

import * as ResponseConstants from '../../../../../../util/constants/response_constants'

import { MulterMiddleware, InvalidFileTypeError } from '../../../../../../util/middleware/multer'
import multer from 'multer';

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

        // TODO: Check permissions
        const promise = new Promise(async (resolve, reject) => {

            const session = await getSession({ req })
            if (!session) {
                return reject(null)
            }

            const user = await getUserByReq(session)
            if (!user) {
                return reject(null)
            }

            // Check if the user is who it claims to be
            if (user.id != parseInt(userID)) {
                return reject(null)
            }

            console.log(user)
            return resolve(user)

        })

            .then(() => {

                // After we confirm the user exists and authenticated, let's start uploading.
                return MulterMiddleware(req, res)
            })

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
                console.log(value)
                return res.status(200).json({ success: "Made it here!" })
            })

            .catch((error) => {

                // The error handling here is a little weird due to how Multer does it's error handling.
                // This catches all the errors that are most likely to happen, and returns a 500 if it's a different error.
                if (error instanceof multer.MulterError) {
                    if (error.code == 4) {
                        return res.status(400).json({ error: 'Files are too large' })
                    } else if (error.code == 5) {
                        return res.status(400).json({ error: 'Too many files' })
                    }
                } else if (error instanceof InvalidFileTypeError && error.name === "InvalidFileTypeError") {
                    return res.status(400).json({ error: 'Invalid file types' })
                }

                // Unhandled - something else failed somewhere
                console.error(error)
                return res.status(500).json({ error: 'Error uploading files' })
            })

        return await promise

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}
