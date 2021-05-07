
import prisma from '../../../../../../util/prisma'
import { getSession } from 'next-auth/client'

import { deleteImages } from '../../../../../../util/database/imageRepository/localFileImageRepository'

export default async (req, res) => {

    // DELETE image by ID - TODO: Figure out how to return API code for this
    if (req.method === "DELETE") {

        try {
            // const deletedImageResult = await prisma.image.delete({
            //     where: {
            //         id: parseInt(imageID)
            //     }
            // })

            // const fileToDelete = `${IMAGE_DESTINATION_FOLDER}/${deletedImageResult.fileName}`

            // // TODO: Handle this
            // path.unlink(fileToDelete, (err) => {
            //     if (err) {
            //         console.error(err)
            //         return res.status(200).json({ error: "DELETED IN DATABASE BUT NOT ON FILE SYSTEM!" })
            //     }

            //     //file removed
            //     return res.status(200).json(deletedImageResult)
            // })

            const deletedImageResult = await deleteImages()

            return res.status(200).json({ deletedImageResult })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}