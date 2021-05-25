
import { imageSchema } from 'util/joiSchemas'

import { getAuthenticatedUserFromRequest } from 'util/database/userUtil'
import { getImage, updateImage, deleteImage } from 'util/database/imageRepository/localFileImageRepository'
import { METHOD_NOT_SUPPORTED, INTERNAL_SERVER_ERROR, NOT_FOUND, INVALID_DATA, NO_AUTHORIZATION} from 'util/constants/response_constants'

import { ValidationError } from 'joi'
import { InvalidUserError } from 'util/errors'

export default async (req, res) => {

    const { userID, imageID } = req.query

    // Get Image by ID
    if(req.method === "GET") {

        return getImage(userID, imageID)
            .then((data) => {
                if (!data)
                    throw { returnAlready: NOT_FOUND }

                return data
            })
            .then((data) => {

                // Return the image if its public
                if(!data.private) {
                    throw { returnAlready: data }
                }

                return data
            })
            .then(() => getAuthenticatedUserFromRequest(req, { ensureUserID: userID }))
            .then(data =>
                res.status(200).send(data) 
            )
            .catch((error) => {

                if(error.returnAlready) {
                    return res.status(404).send({ error: error.returnAlready })
                }

                if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                }

                console.error(error)
                return res.status(500).json({error: INTERNAL_SERVER_ERROR})
            })

    // PATCH request for updating image information
    } else if(req.method === "PATCH") {
 
        const { title, description, private: isPrivate } = req.body

        return imageSchema.validateAsync({ title: title, description: description, private: isPrivate })
            .then(() => getAuthenticatedUserFromRequest(req, { ensureUserID: userID }))      
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

        return getAuthenticatedUserFromRequest(req, { ensureUserID: userID })
            .then(() => deleteImage(userID, imageID))
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                } else if (error.code == 'P2025') {
                    return res.status(404).send({ error: NOT_FOUND })
                }
                console.error(error)
                return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}
