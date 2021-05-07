import prisma from "../../../../../util/prisma"

import { userBalanceSchema } from '../../../../../util/joiSchemas'

export default async (req, res) => {

    const { userID } = req.query

    /*
        Updates the users balance. This route is intentionally left to be open to edit the users money.
    */
    if (req.method === "PATCH") {
        
        const { balance } = req.body

        const { error } = userBalanceSchema.validate({ balance: balance })
        if(error) {
            return res.status(400).json({error: "Invalid data"})
        }

        const updatedUserBalance = await prisma.user.update({
            where: {
                id: parseInt(userID)
            },

            data: {
                balance: balance 
            },

            select: {
                balance: true
            }
        })

        return res.status(200).json(updatedUserBalance)

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}
