import prisma from "../prisma"

import { getSession } from 'next-auth/client'

export function getUser(userID) {
    return prisma.user.findFirst({
        where: {
            id: parseInt(userID)
        },

        select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            balance: true
        }
    })
}

export async function getUserByReq(session) {
    const userID = await getUserFromAccessToken(session?.accessToken)
    const user = await getUser(userID)

    console.log(user)
    return user
}

export async function getUserBySession(session) {
    const userSession = await getSession(session)
    const userID = await getUserFromAccessToken(userSession?.accessToken)
    const user = await getUser(userID)

    console.log(user)
    return user
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

export function getUserTransactions(userID) {

}