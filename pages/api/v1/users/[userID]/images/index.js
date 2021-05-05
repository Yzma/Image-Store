
import prisma from '../../../../../util/prisma'
import { getUserFromAccessToken } from '../../../../../util/userUtil'
import { getSession } from 'next-auth/client'

import initMiddleware from '../../../../../util/initMiddleware'

import { IMAGE_DESTINATION_FOLDER, ACCEPTED_FILE_UPLOAD_MIME_TYPES, MAX_IMAGES_PER_UPLOAD } from '../../../../../util/constants'

import multer from 'multer';
import cryptoRandomString from 'crypto-random-string';

const path = require("path")

// TODO: Move to constants file and have max upload size
const oneMegabyteInBytes = 1000000;
  
const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, IMAGE_DESTINATION_FOLDER)
        },
        filename: function (req, file, cb) {
            const random = cryptoRandomString({length: 10, type: 'url-safe'});
            cb(null, `${random}-${path.extname(newImg.originalname)}`)
        }
    }),

    fileFilter: (req, file, callback) => {
        if(ACCEPTED_FILE_UPLOAD_MIME_TYPES.includes(file.mimetype)) {
            callback(null, true);
        } else {
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }

    },
})

const multerMiddle = initMiddleware(upload.array('images', MAX_IMAGES_PER_UPLOAD))

export default async (req, res) => {

    // TODO: Comments
    const { userID } = req.query

    if(req.method === "GET") {

        const session = await getSession({ req })
        const sessionUserID = await getUserFromAccessToken(session?.accessToken)

        const query = sessionUserID ? 

        {
            where: {
                user: {
                    id: parseInt(userID)
                }
            }
        }

        :

        {
            where: {
                user: {
                    id: parseInt(userID)
                },
                private: false
            }
        }

        const userImages = await prisma.image.findMany(query)

        return res.status(200).json(userImages)

    // POST request to upload image
    } else if(req.method === "POST") {

        try {

            // TODO: Error handling - What if all files aren't uploaded or something in the database fails?
            await multerMiddle(req, res)

            const transactions = []
            for(const newImg of req.files) {

                console.log(path.extname(newImg.originalname))
                console.log('NewImg: ', newImg)
                const result = prisma.image.create({
                    data: {
                        title: newImg.originalname,
                        fileName: newImg.filename,
                        fileType: newImg.mimetype,
                        user: {
                            connect: {
                                id: 1
                            }
                        }
                    }
                })

                transactions.push(result)
            }

            await prisma.$transaction(transactions) // Operations succeed or fail together

            return res.status(200).json({success: "Made it here!"})

        } catch(e) {
            console.error("Exception: ", e)
            return res.status(400).json({error: "something went wrong"})
        }

    } else {
        res.status(500).json({ error: `${req.method} is not supported` })
    }
}

export const config = {
    api: {
        bodyParser: false 
    }
}