
import { userBalanceSchema } from '../../../../../util/joiSchemas'
import { updateUserBalance } from '../../../../../util/database/userUtil'

import { ValidationError } from 'joi'

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
                    return res.status(400).json({error: 'Invalid data'})
                }

                if (error.code == 'P2025') {
                    return res.status(404).send({ error: "Resource not found" })
                }

                return res.status(400).json({error: 'Not found'})
            })

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}
