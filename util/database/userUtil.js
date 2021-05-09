import prisma from "../prisma"

import { getSession } from 'next-auth/client'
import { InvalidUserError } from "../errors"
import * as RESPONSE_ERRORS from "../constants/response_constants"

export const TRANSACTION_QUERY = {
    BOUGHT: 'bought',
    SOLD: 'sold'
}

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

export function getAuthenticatedUserFromRequest(req, options = null) {
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

            if(options?.ensureUserID) {
                if(id != options.ensureUserID) {
                    throw new InvalidUserError(RESPONSE_ERRORS.NO_AUTHORIZATION)
                }
            }            

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
            return resolve(prisma.transaction.findMany(getTransactionQueryByOption(parseInt(userID), option)))
        } catch(error) {
            return reject(error)
        }
    })
}

export function getUserProducts(userID) {
    return prisma.product.findMany({
        where: {
            image: {
                userID: userID
            }
        }
    })
}

export function attemptPurchase(userID, imageID) {

}

function getTransactionQueryByOption(userID, option) {
    if(option == TRANSACTION_QUERY.BOUGHT) {
        
        return {
            where: {
                buyerUserID: userID
            },

            include: {
                image: true
            }
        }
    } else if(option == TRANSACTION_QUERY.SOLD) {
        return {
            where: {
                sellerUserID: userID
            },

            include: {
                image: true
            }
        }
    }
}