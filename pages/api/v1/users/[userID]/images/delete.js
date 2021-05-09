
import { getAuthenticatedUserFromRequest } from '../../../../../../util/database/userUtil'
import { deleteImages } from '../../../../../../util/database/imageRepository/localFileImageRepository'
import { imageDeleteSchema } from '../../../../../../util/joiSchemas'

import { ValidationError } from 'joi'
import { InvalidUserError } from '../../../../../../util/errors'

import { INVALID_DATA, METHOD_NOT_SUPPORTED, INTERNAL_SERVER_ERROR } from '../../../../../../util/constants/response_constants'

export default async (req, res) => {

    // DELETE image by ID - TODO: Figure out how to return API code for this
    if (req.method === "DELETE") {

        const { userID, ids } = req.body

        return await imageDeleteSchema.validateAsync({ ids: ids })
            .then(() => getAuthenticatedUserFromRequest(req, { ensureUserID: userID }))
            .then(() => deleteImages(userID, ids))
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({error: INVALID_DATA})
                } else if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                }

                console.error(error)
                return res.status(500).json({error: INTERNAL_SERVER_ERROR})
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}