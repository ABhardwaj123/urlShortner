import { Url } from "../models/url.models.js"
import generateShortCode from "../utils/generateShortCode"


const createShortUrl = async (req , res) => {
    const {url} = req.body

    const existingUrl = await Url.findOne({url})

    if(existingUrl){
        return res.status(200).json({
            message: "short url has already been created for this url"
        })
    }

    const shortCode = generateShortCode()

    const newUrl = Url.create({
        url: url,
        shortCode: shortCode,
        accessCount: 0
    })

    return res.status(200).json({
        newUrl,
        message: "new entry is created successfully"
    })
}