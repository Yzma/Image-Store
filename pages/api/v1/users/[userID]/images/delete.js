
import { getSession } from 'next-auth/client'

import { deleteImages } from '../../../../../../util/database/imageRepository/localFileImageRepository'
import { imageDeleteSchema } from '../../../../../../util/joiSchemas'

import { ValidationError } from 'joi'

export default async (req, res) => {

    // DELETE image by ID - TODO: Figure out how to return API code for this
    if (req.method === "DELETE") {

        const { userID, ids } = req.body

        return await imageDeleteSchema.validateAsync({ ids: ids })
            .then(() => deleteImages(userID, ids))
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({error: 'Invalid data'})
                }
                return res.status(400).json({error: 'Not found'})
            })

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}