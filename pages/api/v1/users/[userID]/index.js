
import prisma from '../../../../../util/prisma'
import { getSession } from 'next-auth/client'
import { getUser } from '../../../../../util/database/userUtil'

export default async (req, res) => {

    const { userID } = req.query

    /*
        Gets information from the provided userID. This only returns the following information: ID, name, image, createdAt, and money
    */
    if (req.method === "GET") {
        
        const foundUser = await getUser(userID)

        if(!foundUser) {
            return res.status(404).json({ error: `Not found` })
        }

        return res.status(200).json(foundUser)

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}
