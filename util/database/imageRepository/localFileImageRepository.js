
/* 
    TODO: Ideally we would want some sort of interface to handle the management of photos.
    Since we are using a local file storage, we would implement the interface to use the local storage.
    When down the line we want to switch to a CDN (google or amazon), then we can implement a different version to wait for images to upload.
    We do this so we can eliminate the local file storage methods in the API routes. This gives us the ability to not worry about the implementation details.
*/

import prisma from '../../prisma'
import { IMAGE_DESTINATION_FOLDER, MAX_IMAGES_PER_PAGE } from '../../constants'
import mimeTypes from 'mime-types'

const fs = require('fs');
// const path = require('path');

export function getImage(userID, imageID) {

    const requestedImage = prisma.image.findFirst({
        where: {
            id: parseInt(imageID),
            user: {
                id: parseInt(userID)
            }
        },

        select: {
            title: true,
            description: true,
            private: true,
            fileType: true,
            dateUploaded: true,
            fileName: true,
            userID: true
        }
    })

    return requestedImage
}

export function getImageById(imageID) {

    const requestedImage = prisma.image.findFirst({
        where: {
            id: parseInt(imageID),
        },

        select: {
            id: true,
            title: true,
            description: true,
            private: true,
            fileType: true,
            dateUploaded: true,
            fileName: true,
            userID: true
        }
    })

    return requestedImage
}
export async function getImages(userID) {

    return prisma.image.findMany({
        where: {
            user: {
                id: parseInt(userID)
            }
        }
    })
}

//https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing 
// TODO: Return 15 maximum images, and also return total private images
export function getPublicImages(currentPage = 0) {
    const publicImages = prisma.image.findMany({
        take: MAX_IMAGES_PER_PAGE,
        skip: currentPage * MAX_IMAGES_PER_PAGE,
        where: {
            private: false
        },
    })

    return publicImages
}

export function getImageOnDisk(imageName) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${IMAGE_DESTINATION_FOLDER}/${imageName}`, (err, data) => {
            if (err)
                return reject(err);
            else
                return resolve({ imageData: data, mimeType: mimeTypes.lookup(imageName)});
        });
    });
}

export async function uploadImages(userID, images) {

}

export function deleteImage(userID, imageID) {
    return prisma.image.delete({
        where: {
            id: imageID,
            userID: userID
        }
    })
}

export async function deleteImages(userID, imageIDs) {

    return prisma.image.deleteMany({
        where: {
            AND: [
                {
                    id: {
                        in: imageIDs
                    }
                },

                {
                    userID: userID
                }
            ]
        }
    })
}

export async function updateImage(userID, imageID, updatedSettings) {

    const { title, description, private: isPrivate } = updatedSettings

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
            private: isPrivate
        }
    })

    return updatedImage
}
