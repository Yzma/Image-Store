import prisma from "../prisma"

export function getUser(userID) {
    return prisma.user.findFirst({
        where: {
            id: parseInt(userID)
        },

        select: {
            name: true,
            image: true,
            createdAt: true,
            money: true
        }
    })
}

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
