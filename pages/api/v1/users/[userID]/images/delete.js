
import prisma from '../../../../../../util/prisma'
import { getSession } from 'next-auth/client'

// import { deleteImages } from '../../../../../../util/database/imageRepository/localFileImageRepository'
import { imageDeleteSchema } from '../../../../../../util/joiSchemas'

export default async (req, res) => {

    // DELETE image by ID - TODO: Figure out how to return API code for this
    if (req.method === "DELETE") {

        const { ids } = req.body

        try {

            const { error } = imageDeleteSchema.validate({ ids: ids })
            if(error) {
                return res.status(400).json({error: "Invalid data"})
            }

            // Just assume
            const userID = 2

            const deletedImages = await prisma.image.deleteMany({
                where: {
                    AND: [
                        {
                            id: {
                                in: ids
                            }
                        },

                        {
                            userID: userID
                        }
                    ]
                }
            })

            return res.status(200).json(deletedImages)
            
        } catch(err) {
            console.error(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}