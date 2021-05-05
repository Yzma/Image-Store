import prisma from "./prisma"

export const getUserFromAccessToken = async (accessToken) => {
    
    if(!accessToken)
        return null

    const result = await prisma.session.findFirst({
        where: {
            accessToken: accessToken
        },

        select: {
            userId: true
        }
    })

    return result?.userId
}
