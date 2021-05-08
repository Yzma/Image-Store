
import { transactionModeSchema } from '../../../../../../util/joiSchemas'
import { getUserTransactions } from '../../../../../../util/database/userUtil'

import { ValidationError } from 'joi'

export default async (req, res) => {

    const { userID } = req.query

    if (req.method === "GET") {
        
        const { option } = req.body

        const userTransactions = transactionModeSchema.validateAsync({ option: option })
            .then(() => getUserTransactions(userID, option))
            .then((data) => {
                return res.status(200).json(data)
            })
            .catch((error) => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({error: 'Invalid data'})
                }
                return res.status(400).json({error: 'Not found'})
            })

        return await userTransactions

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}
