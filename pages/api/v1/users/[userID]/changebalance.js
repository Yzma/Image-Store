
import { userBalanceSchema } from '../../../../../util/joiSchemas'
import { updateUserBalance } from '../../../../../util/database/userUtil'

import { ValidationError } from 'joi'
import { InvalidUserError } from '../../../../../util/errors'

import { METHOD_NOT_SUPPORTED, INVALID_DATA, NOT_FOUND, INTERNAL_SERVER_ERROR } from '../../../../../util/constants/response_constants'

export default async (req, res) => {

    const { userID } = req.query

    /*
        Updates the users balance. This route is intentionally left to be open to edit the users money.
    */
    if (req.method === "PATCH") {
        
        const { balance } = req.body

        return await userBalanceSchema.validateAsync({ balance: balance })
            .then(() => updateUserBalance(userID, balance))
            .then((data) => res.status(200).json(data))
            .catch((error) => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({error: INVALID_DATA})
                }

                if(error instanceof InvalidUserError) {
                    return res.status(400).json({error: error.errorDescription})
                }

                if (error.code == 'P2025') {
                    return res.status(404).send({ error: NOT_FOUND })
                }

                console.error(error)
                return res.status(400).json({error: INTERNAL_SERVER_ERROR})
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}
