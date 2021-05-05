
import prisma from '../../../../../../util/prisma'
import { getSession } from 'next-auth/client'

import { imageSchema } from '../../../../../../util/joiSchemas'
import { IMAGE_DESTINATION_FOLDER } from '../../../../../../util/constants'

const path = require('fs')

export default async (req, res) => {

    // TODO: Comments
    const { userID, imageID } = req.query

    // Get Image by ID
    if(req.method === "GET") {

        const requestedImage = await prisma.image.findFirst({
            where: {
                id: parseInt(imageID)
            },

            select: {
                title: true,
                description: true,
                private: true,
                fileType: true,
                dateUploaded: true,
                fileName: true
            }
        })

        return res.status(200).json(requestedImage)

    // PATCH request for updating image information
    } else if(req.method === "PATCH") {
 
        const { title, description } = req.body

        const { error } = imageSchema.tailor("update").validate({ title: title, description: description })
        if(error) {
            return res.status(404).json({error: "Invalid data"})
        }

        const updatedImage = await prisma.image.update({
            where: {
                id: parseInt(imageID),
                //userID: userID
            },

            data: {
                title: title,
                description: description
            }
        })

        return res.status(200).json(updatedImage)

    // DELETE image by ID - TODO: Figure out how to return API code for this
    } else if(req.method === "DELETE") {

        try {
            const deletedImageResult = await prisma.image.delete({
                where: {
                    id: parseInt(imageID)
                }
            })

            const fileToDelete = `${IMAGE_DESTINATION_FOLDER}/${deletedImageResult.fileName}`

            // TODO: Handle this
            path.unlink(fileToDelete, (err) => {
                if (err) {
                  console.error(err)
                  return res.status(200).json({error: "DELETED IN DATABASE BUT NOT ON FILE SYSTEM!"})
                }

                //file removed
                return res.status(200).json(deletedImageResult)
              })

        } catch(e) {
            console.error(e)
            return res.status(400).json({error: 'Internal server error'})
        }

    } else {
        res.status(500).json({ error: `${req.method} is not supported` })
    }
}

export const config = {
    api: {
        bodyParser: true 
    }
}