
/* 
    TODO: Ideally we would want some sort of interface to handle the management of photos.
    Since we are using a local file storage, we would implement the interface to use the local storage.
    When down the line we want to switch to a CDN (google or amazon), then we can implement a different version to wait for images to upload.
    We do this so we can eliminate the local file storage methods in the API routes. This gives us the ability to not worry about the implementation details.
*/

import prisma from '../../prisma'

const fs = require('fs');
const path = require('path');

export async function getImage(userID, imageID) {

    const requestedImage = await prisma.user.findFirst({
        where: {
            id: parseInt(userID),

        },

        select: {
            images: {
                where: {
                    id: parseInt(imageID)
                },

                select: {
                    title: true,
                    description: true,
                    private: true,
                    fileType: true,
                    dateUploaded: true,
                    fileName: true
                }
            }
        }
    })

    return requestedImage
}

export async function getImages(userID) {

    const userImages = await prisma.image.findMany({
        where: {
            user: {
                id: parseInt(userID)
            }
        }
    })

    return userImages
} 

export async function getImageOnDisk(filePath) {

}

export async function uploadImages(userID, images) {

}

export async function deleteImages(userID, images) {

}

export async function updateImage(userID, imageID, updatedSettings) {

    const { title, description } = updatedSettings

    const updatedImage = await prisma.image.update({
        where: {
            id_userID: {
                id: parseInt(imageID),
                userID: parseInt(userID)
            }
        },

        data: {
            title: title,
            description: description,
        }
    })

    return updatedImage
}
