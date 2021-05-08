import prisma from "../../../../../util/prisma"

export default async (req, res) => {

    const { userID } = req.query

    if (req.method === "GET") {
        
    
        return res.status(404).json({ error: 'Not implemented' })

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}
