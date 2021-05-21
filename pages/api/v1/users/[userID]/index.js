
import { getUser } from '../../../../../util/database/userUtil'
import { METHOD_NOT_SUPPORTED, USER_NOT_FOUND } from '../../../../../util/constants/response_constants'

export default async (req, res) => {

    const { userID } = req.query

    /*
        Gets information from the provided userID. This only returns the following information: ID, name, image, createdAt, and money
    */
    if (req.method === "GET") {
        
        return getUser(userID)
            .then((data) => {
                if(!data) {
                    return res.status(404).json({ error: USER_NOT_FOUND })
                }

                return res.status(200).json(data)
            })
            .catch((error) => {
                return res.status(500).json({error: INTERNAL_SERVER_ERROR})
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}
