
// The maximum number of images to be displayed on a single page (used for database Pagination)
export const MAX_IMAGES_PER_PAGE = 12

// The folder to store all uploaded images
export const IMAGE_DESTINATION_FOLDER = './uploaded-images';

// An array of accepted file mime types
export const ACCEPTED_FILE_UPLOAD_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"]

// The amount of images that can be uploaded at a time
export const MAX_IMAGES_PER_UPLOAD = 15

// The maximum size of a file in bytes
export const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 // One mega-byte

export const ErrorCode = {
    NO_AUTHORIZATION: 0,
    NOT_FOUND: 1
}