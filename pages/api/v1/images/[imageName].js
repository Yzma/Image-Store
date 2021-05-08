
import { getImageOnDisk } from "../../../../util/database/imageRepository/localFileImageRepository"

export default async (req, res) => {

    const { imageName } = req.query

    if (req.method === "GET") {
        
        return await getImageOnDisk(imageName)
            .then((image) => {
                res.setHeader('Content-Type', image.mimeType);
                return res.status(200).send(image.imageData)
            })

            .catch((error) => {
                if (error.code === 'ENOENT') {
                    return res.status(500).send({error: 'File not found'})
                }
                console.error(error)
                return res.status(500).send({error: 'Internal Server Error'})
            })

    } else {
        res.status(404).json({ error: `${req.method} is not supported` })
    }
}
