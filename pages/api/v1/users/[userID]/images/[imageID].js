
import prisma from '../../../../../../util/prisma'
import { getSession } from 'next-auth/client'

import { imageSchema } from '../../../../../../util/joiSchemas'
import { IMAGE_DESTINATION_FOLDER } from '../../../../../../util/constants'

import { getImage, updateImage } from '../../../../../../util/database/imageRepository/localFileImageRepository'

const path = require('path')
const fs = require('fs')

export default async (req, res) => {

    // TODO: Comments
    const { userID, imageID } = req.query

    // Get Image by ID
    if(req.method === "GET") {

        // TODO: Validate image and user ID
        return await getImage(userID, imageID)
            .then((data) => {
                if (!data)
                    return res.status(404).send({ error: 'Not Found' })

                return res.status(200).send(data)
            }).catch((error) => {
                console.error(error)
                return res.status(500).json({error: 'Internal Server Error'})
            })

    // PATCH request for updating image information
    } else if(req.method === "PATCH") {
 
        const { title, description, private: isPrivate } = req.body

        try {

            const { error } = imageSchema.tailor("update").validate({ title: title, description: description, private: isPrivate })
            if(error) {
                return res.status(400).json({error: "Invalid data"})
            }

            const updatedImage = await updateImage(userID, imageID, { title, description, private: isPrivate })

            return res.status(200).json(updatedImage)
            
        } catch(err) {

            // Record to update not found.
            if(err.code == 'P2025') {
                return res.status(404).send({error: "Resource not found"})
            }

            console.error(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }


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

        } catch(error) {

            // Record to update not found.
            if(error.code == 'P2025') {
                return res.status(404).send({error: "Resource not found"})
            }

            console.error(error)
            return res.status(500).json({error: 'Internal server error'})
        }

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}

export const config = {
    api: {
        bodyParser: true 
    }
}