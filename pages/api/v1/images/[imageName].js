
import { getImageOnDisk } from "util/database/imageRepository/localFileImageRepository"

import { METHOD_NOT_SUPPORTED, NOT_FOUND, INTERNAL_SERVER_ERROR } from "util/constants/response_constants"

export default async (req, res) => {

    const { imageName } = req.query

    if (req.method === "GET") {
        
        return getImageOnDisk(imageName)
            .then((image) => {
                res.setHeader('Content-Type', image.mimeType);
                return res.status(200).send(image.imageData)
            })

            .catch((error) => {
                if (error.code === 'ENOENT') {
                    return res.status(500).send({error: NOT_FOUND})
                }
                console.error(error)
                return res.status(500).send({error: INTERNAL_SERVER_ERROR})
            })

    } else {
        res.status(404).json({ error: METHOD_NOT_SUPPORTED })
    }
}
