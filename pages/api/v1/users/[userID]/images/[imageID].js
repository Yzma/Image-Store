
import { imageSchema } from '../../../../../../util/joiSchemas'

import { getAuthenticatedUserFromRequest } from '../../../../../../util/database/userUtil'
import { getImage, updateImage, deleteImage } from '../../../../../../util/database/imageRepository/localFileImageRepository'
import { METHOD_NOT_SUPPORTED, INTERNAL_SERVER_ERROR, NOT_FOUND, INVALID_DATA } from '../../../../../../util/constants/response_constants'

import { ValidationError } from 'joi'
import { InvalidUserError } from '../../../../../../util/errors'

export default async (req, res) => {

    const { userID, imageID } = req.query

    // Get Image by ID
    if(req.method === "GET") {

        // TODO: Validate image and user ID
        return await getImage(userID, imageID)
            .then((data) => {
                if (!data)
                    return res.status(404).send({ error: NOT_FOUND })

                return res.status(200).send(data)
            }).catch((error) => {
                console.error(error)
                return res.status(500).json({error: INTERNAL_SERVER_ERROR})
            })

    // PATCH request for updating image information
    } else if(req.method === "PATCH") {
 
        const { title, description, private: isPrivate } = req.body

        return await imageSchema.validateAsync({ title: title, description: description, private: isPrivate })
            .then(() => getAuthenticatedUserFromRequest(req))

            // TODO: Make this prettier
            .then((data) => {
                if(data.id !== userID) {
                    throw new InvalidUserError('No permission')
                }

                return data
            })

            
            .then(() => updateImage(userID, imageID,  { title, description, private: isPrivate }))
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({error: INVALID_DATA})
                } else if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                } else if(error.code == 'P2025') {
                     return res.status(404).send({error: NOT_FOUND})
                }

                console.error(err)
                return res.status(500).json({error: INTERNAL_SERVER_ERROR})
            })

    // DELETE image by ID - TODO: Figure out how to return API code for this
    } else if(req.method === "DELETE") {

        // TODO: Actually delete files on disk
        return await deleteImage(userID, imageID)
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                if (error.code == 'P2025') {
                    return res.status(404).send({ error: NOT_FOUND })
                }
                console.error(error)
                return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}
