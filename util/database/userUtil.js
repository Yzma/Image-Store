import prisma from "../prisma"

import { getSession } from 'next-auth/client'
import { InvalidUserError } from "../errors"
import * as RESPONSE_ERRORS from "../constants/response_constants"

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

export function getAuthenticatedUserFromRequest(req) {
    return getSession({req})
        .then((session) => {

            if (!session) {
                throw new InvalidUserError(RESPONSE_ERRORS.INVALID_SESSION_DATA)
            }

            return prisma.session.findFirst({
                where: {
                    accessToken: session.accessToken
                },

                select: {
                    userId: true
                }
            })
        })
        .then((userID) => {

            if (!userID) {
                throw new InvalidUserError(RESPONSE_ERRORS.USER_NOT_FOUND)
            }

            const { userId: id } = userID

            return prisma.user.findFirst({
                where: {
                    id: id
                },

                select: {
                    id: true,
                    name: true,
                    image: true,
                    createdAt: true,
                    balance: true
                }
            })
        })
}

export function updateUserBalance(userID, balance) {
    return prisma.user.update({
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
}

export function getUserTransactions(userID, option) {
    return new Promise((resolve, reject) => {
        try {
            return resolve(prisma.transaction.findMany(getTransactionQueryByOption(userID, option)))
        } catch(error) {
            return reject(error)
        }
    })
}

function getTransactionQueryByOption(userID, option) {
    if(option.equals === "bought") {
        return {
            where: {
                buyerUserID: userID
            }
        }
    } else if(option.equals === "sold") {
        return {
            where: {
                sellerUserID: userID
            }
        }
    }
}