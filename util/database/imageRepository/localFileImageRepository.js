
/* 
    TODO: Ideally we would want some sort of interface to handle the management of photos.
    Since we are using a local file storage, we would implement the interface to use the local storage.
    When down the line we want to switch to a CDN (google or amazon), then we can implement a different version to wait for images to upload.
    We do this so we can eliminate the local file storage methods in the API routes. This gives us the ability to not worry about the implementation details.
*/

import prisma from '../../prisma'
import mimeTypes from 'mime-types'

import { IMAGE_DESTINATION_FOLDER, MAX_IMAGES_PER_PAGE } from '../../constants'

import { unlink, readFile } from 'fs';

import { cacheContainer } from '../cache/cacheContainer'

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

    return prisma.image.findFirst({
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
}

export function getAllImages(userID) {
    
    const parsedID = parseInt(userID)

    return prisma.image.findMany({
        where: {
            userID: parsedID
        }
    })
}

export function getImages(userID, visibilityMode) {
    
    const parsedID = parseInt(userID)

    const visibilityQuery = {
        PUBLIC: {
            where: {
                userID: parsedID,
                private: false
            },
        },

        PRIVATE: {
            where: {
                userID: parsedID,
                private: true
            }
        },

        ALL: {
            where: {
                userID: parsedID
            }
        }
    }

    const queryMode = visibilityQuery[visibilityMode] || visibilityQuery.PUBLIC

    return prisma.image.findMany(queryMode)
}

//https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing 
// TODO: Return 15 maximum images, and also return total private images
export function getPublicImages(currentPage = 0) {
    return prisma.image.findMany({
        take: MAX_IMAGES_PER_PAGE,
        skip: currentPage * MAX_IMAGES_PER_PAGE,
        where: {
            private: false
        },
    })
}

export function getPaginationResultsFromImages(currentPage, images) {
    const page = parseInt(currentPage) || 0;
    const limit = MAX_IMAGES_PER_PAGE
    const imagesLength = images.length

    const result = {
        forward: false,
        back: false,
        invalid: false
    }

    if(page == 0) {
        if(imagesLength >= limit) {
            result.forward = true
        }
    }  
    
    if(page > 0) {
        result.back = true
    }

    return new Promise((resolve, reject) => {
        return resolve({
            result: result,
            page: page,
            images: images
        })
    })
}

export function getImageOnDisk(imageName) {
    return new Promise((resolve, reject) => {
        readFile(`${IMAGE_DESTINATION_FOLDER}/${imageName}`, (err, data) => {
            if (err)
                return reject(err);
            else
                return resolve({ imageData: data, mimeType: mimeTypes.lookup(imageName)});
        });
    });
}

export function deleteImageOnDisk(imageFile) {
    return new Promise((resolve, reject) => {
        return unlink(`${IMAGE_DESTINATION_FOLDER}/${imageFile}`, (error) => {
            if(error) {
                return reject(error);
            }
    
            return resolve(imageFile)
        })
    })
}

export async function uploadImages(userID, images) {

    const parsedUserID = parseInt(userID)
    const data = images.map((value) => {
        console.log(value)
        return {
            title: value.originalname,
            fileName: value.filename,
            fileType: value.mimetype,
            userID: parsedUserID
        }
    })

    return prisma.image.createMany({
        data: data
    })
}

export function deleteImage(userID, imageID) {
    return prisma.image.delete({
        where: {
            id_userID: {
                id: parseInt(imageID),
                userID: parseInt(userID)
            }
        }
    }).then((data) => deleteImageOnDisk(data.fileName))
}

export async function deleteImages(userID, imageIDs) {

    const foundImagesIDs = prisma.image.findMany({
        
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
        },

        select: {
            fileName: true
        }
    })

    const imagesToDelete = prisma.image.deleteMany({
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

    return prisma.$transaction([foundImagesIDs, imagesToDelete])
        .then((data) => {
            const [retrievedImageIDs, deletedRowsCount] = data

            if (deletedRowsCount.count > 0) {
                return Promise.all(retrievedImageIDs.map((imageFile) => {
                    return deleteImageOnDisk(imageFile.fileName)
                }))
            }
            return null
    })
}

export async function updateImage(userID, imageID, updatedSettings) {

    const { title, description, private: isPrivate } = updatedSettings

    return prisma.image.update({
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
}
