

import { getAuthenticatedUserFromRequest, getUserProducts } from '../../../../../../util/database/userUtil'

import { INTERNAL_SERVER_ERROR, METHOD_NOT_SUPPORTED} from '../../../../../../util/constants/response_constants'
import { ValidationError } from 'joi'
import { InvalidUserError } from '../../../../../../util/errors'

export default async (req, res) => {

    const { userID } = req.query

    if (req.method === "GET") {
        
        return await getAuthenticatedUserFromRequest(req, { ensureUserID: parseInt(userID) })
            .then(() => getUserProducts(parseInt(userID)))
            .then((data) => {
                return res.status(200).json(data)
            })
            .catch((error) => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({error: INVALID_DATA})
                } else if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                }

                console.error(error)
                return res.status(500).json({error: INTERNAL_SERVER_ERROR})
            })

    } else if (req.method === "POST") {
        
        const { imageID } = req.body

        // Create a new product 
        return await getAuthenticatedUserFromRequest(req)
            .then((data) => null)
            .catch((error) => {

            })
        // return await getAuthenticatedUserFromRequest(req)
        //     .then(() => getUserTransactions(userID, option))
        //     .then((data) => {
        //         return res.status(200).json(data)
        //     })
        //     .catch((error) => {
        //         if(error instanceof ValidationError) {
        //             return res.status(400).json({error: INVALID_DATA})
        //         } else if(error instanceof InvalidUserError) {
        //             return res.status(400).json({error: error.errorDescription})
        //         }

        //         return res.status(500).json({error: INTERNAL_SERVER_ERROR})
        //     })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}
