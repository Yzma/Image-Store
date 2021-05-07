
import prisma from '../../../../../../util/prisma'
import { getUserFromAccessToken } from '../../../../../../util/database/userUtil'
import { getSession } from 'next-auth/client'

import { MulterMiddleware } from '../../../../../../util/middleware/multer'

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
            return await MulterMiddleware(req, res).then(async (value) => {

                const transactions = []
                for(const newImg of req.files) {
    
                    // console.log(path.extname(newImg.originalname))
                    // console.log('NewImg: ', newImg)
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

            }).catch((error) => {
                console.log(error)
                return res.status(400).json({error: 'Error uploading files'})
            })

          
        } catch(e) {
            console.error("Exception: ", e)
            return res.status(500).json({error: "Internal server error"})
        }

        // TODO: Move this into another route? We need bodyParser to be enabled but disabled for the POST route
    // DELETE request to delete multiple images
    // } else if(req.method === "DELETE") {

    //     const { ids } = req.body
    //     console.log(ids)

    //     try {
    //         // id: { in: ids },

    //         const deletedImageResult = await prisma.user.update({
    //             where: {
    //                 id: parseInt(userID)
    //             },

    //             data: {
    //                 images: {
    //                     deleteMany: {
    //                         id: { in: ids }
    //                     }
    //                 }
    //             }
    //         })

    //         // const deletedImageResult = await prisma.image.deleteMany({
    //         //     where: {
    //         //         id: { in: ids },
    //         //     }
    //         // })

    //         return res.status(200).json(deletedImageResult)

    //     } catch(e) {
    //         console.error("Exception: ", e)
    //         return res.status(400).json({error: "something went wrong"})
    //     }

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}

export const config = {
    api: {
        bodyParser: false 
    }
}